import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

const { Proyecto, Usuario } = require("../../models") as {
  Proyecto: any;
  Usuario: any;
};

export class ProjectService {
  private buildError(message: string, statusCode: number) {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
  }

  private async findProjectOrFail(id: number) {
    const proyecto = await Proyecto.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: "responsable",
          attributes: ["id", "nombre_completo", "correo_electronico"],
        },
      ],
    });

    if (!proyecto) {
      throw this.buildError("Proyecto no encontrado", 404);
    }

    return proyecto;
  }

  public async create(dto: CreateProjectDto, usuarioResponsableId: number) {
    // El usuario autenticado queda como responsable del proyecto.
    const proyecto = await Proyecto.create({
      usuario_responsable_id: usuarioResponsableId,
      titulo: dto.titulo,
      resumen: dto.resumen ?? null,
      descripcion: dto.descripcion,
      monto_objetivo: dto.monto_objetivo,
      estado: dto.estado ?? "draft",
      fecha_inicio: dto.fecha_inicio ?? null,
      fecha_fin: dto.fecha_fin ?? null,
      url_imagen_portada: dto.url_imagen_portada ?? null,
    });

    return this.findProjectOrFail(proyecto.id);
  }

  public async findAll() {
    return Proyecto.findAll({
      include: [
        {
          model: Usuario,
          as: "responsable",
          attributes: ["id", "nombre_completo", "correo_electronico"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
  }

  public async findById(id: number) {
    return this.findProjectOrFail(id);
  }

  public async update(id: number, dto: UpdateProjectDto, usuarioResponsableId: number) {
    const proyecto = await this.findProjectOrFail(id);

    // Solo el responsable del proyecto puede editarlo.
    if (proyecto.usuario_responsable_id !== usuarioResponsableId) {
      throw this.buildError("No tienes permisos para editar este proyecto", 403);
    }

    await proyecto.update({
      ...(dto.titulo !== undefined ? { titulo: dto.titulo } : {}),
      ...(dto.resumen !== undefined ? { resumen: dto.resumen } : {}),
      ...(dto.descripcion !== undefined ? { descripcion: dto.descripcion } : {}),
      ...(dto.monto_objetivo !== undefined ? { monto_objetivo: dto.monto_objetivo } : {}),
      ...(dto.estado !== undefined ? { estado: dto.estado } : {}),
      ...(dto.fecha_inicio !== undefined ? { fecha_inicio: dto.fecha_inicio } : {}),
      ...(dto.fecha_fin !== undefined ? { fecha_fin: dto.fecha_fin } : {}),
      ...(dto.url_imagen_portada !== undefined ? { url_imagen_portada: dto.url_imagen_portada } : {}),
    });

    return this.findProjectOrFail(id);
  }
}
