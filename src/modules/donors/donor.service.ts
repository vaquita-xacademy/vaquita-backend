import { hashSync } from "bcrypt";
import { sequelize } from "../../db/sequelize";
import { CreateDonorDto } from "./dto/create-donor.dto";

const { TipoUsuario, Usuario } = require("../../models") as {
  TipoUsuario: any;
  Usuario: any;
};

export class DonorService {
  private buildError(message: string, statusCode: number) {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
  }

  public async create(dto: CreateDonorDto) {
    if (dto.password !== dto.password_confirmation) {
      throw this.buildError("Las contrasenas no coinciden", 400);
    }

    return sequelize.transaction(async (transaction) => {
      // Verificamos unicidad antes de crear para devolver errores mas claros.
      const usuarioConMismoCorreo = await Usuario.findOne({
        where: { correo_electronico: dto.email },
        paranoid: false,
        transaction,
      });

      if (usuarioConMismoCorreo) {
        throw this.buildError("El correo electronico ya esta registrado", 409);
      }

      const usuarioConMismoDni = await Usuario.findOne({
        where: { dni: dto.dni },
        paranoid: false,
        transaction,
      });

      if (usuarioConMismoDni) {
        throw this.buildError("El DNI ya esta registrado", 409);
      }

      // Si el tipo donante no existe, lo creamos para no depender de seeds.
      const [tipoDonante] = await TipoUsuario.findOrCreate({
        where: { nombre: "donante" },
        defaults: {
          descripcion: "Usuario que realiza aportes a los proyectos",
        },
        transaction,
      });

      const donanteCreado = await Usuario.create(
        {
          tipo_usuario_id: tipoDonante.id,
          nombre_completo: dto.full_name,
          correo_electronico: dto.email,
          contrasena_hash: hashSync(dto.password, 10),
          dni: dto.dni,
          fecha_nacimiento: dto.birth_date,
          estado: "active",
        },
        { transaction }
      );

      // Recargamos con el scope seguro para no exponer el hash en la respuesta.
      const donante = await Usuario.findByPk(donanteCreado.id, {
        include: [
          {
            model: TipoUsuario,
            as: "tipoUsuario",
            attributes: ["id", "nombre"],
          },
        ],
        transaction,
      });

      if (!donante) {
        throw this.buildError("No se pudo recuperar el donante creado", 500);
      }

      return donante;
    });
  }
}
