import { QueryFailedError, Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { Usuario } from "../../entities/Usuario";
import bcryptjs from "bcryptjs";
import { CustomError } from "express-handler-errors";

class UserService {
  private repo: Repository<Usuario>;

  async initialize() {
    this.repo = (await connection).getRepository(Usuario);
  }

  constructor() {
    this.initialize();
  }

  async create(data) {
    data.senha = await bcryptjs.hash(data.senha, 10);

    try {
      const response = await this.repo
        .createQueryBuilder()
        .insert()
        .into(Usuario)
        .values(data)
        .execute();

      return response;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes("duplicate key")
      ) {
        throw new CustomError({
          code: "DUPLICATE_USER",
          message: "Este usuário já existe",
          status: 400,
        });
      }
    }
  }

  async delete(id) {
    const response = await this.repo
      .createQueryBuilder()
      .delete()
      .from(Usuario)
      .where("id = :id", { id: id })
      .execute();

    if (response.affected === 0) {
      throw new CustomError({
        code: "USER_NOT_FOUND",
        message: "Usuário não encontrado",
        status: 404,
      });
    }

    return response;
  }

  async update(data) {
    const response = await this.repo
      .createQueryBuilder()
      .update(Usuario)
      .set(data)
      .where("id = :id", { id: data.id })
      .execute();

    if (response.affected === 0) {
      throw new CustomError({
        code: "USER_NOT_FOUND",
        message: "Usuário não encontrado",
        status: 404,
      });
    }

    return response;
  }
}

export default new UserService();
