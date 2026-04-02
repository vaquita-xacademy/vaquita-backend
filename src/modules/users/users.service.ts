import { sequelize } from "../../db/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "../../db/models";
import { hashSync } from "bcrypt";
import { InternalServerErrorException } from "../../exceptions";

export class UserService {

  public async create(dto: CreateUserDto) {
    return sequelize.transaction(async (transaction) => {
      const passwordHash = hashSync(dto.password, 10);
      const userCreated = await User.create(
        {
          name: dto.name,
          email: dto.email,
          password_hash: passwordHash,
          role: dto.role
        }, { transaction }
      );

      if (!userCreated)
        throw new InternalServerErrorException("No se pudo recuperar el usuario creado");

      return userCreated;
    });
  }
}