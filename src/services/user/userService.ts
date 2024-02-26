import { Not, QueryFailedError, Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { Usuario } from "../../entities/Usuario";
import bcryptjs from "bcryptjs";
import { CustomError } from "express-handler-errors";
import { Especialidade } from "src/entities/Especialidade";
import { Tratamento } from "src/entities/Tratamento";

class UserService {
  private repo: Repository<Usuario>;

  async initialize() {
    this.repo = (await connection).getRepository(Usuario);
  }

  constructor() {
    this.initialize();
  }

  async create(data: {
    name: string;
    crm?: string;
    senha: string;
    email: string;
    nascimento: Date;
    nivel: number;
    salario: number;
    especialidade?: Especialidade;
    empregado: boolean;
    tratamentos?: Tratamento[];
  }) {
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
          message: error.message,
          status: 400,
        });
      }
    }
  }

  async delete(id: number) {
    const response = await this.repo
      .createQueryBuilder()
      .update(Usuario)
      .set({ empregado: false })
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

  async update(data: {
    id: number;
    name?: string;
    crm?: string;
    senha?: string;
    email?: string;
    nascimento?: Date;
    nivel?: number;
    salario?: number;
    especialidade?: Especialidade;
    empregado?: boolean;
  }) {
    const { crm, email, id } = data;

    const existEmail = email
      ? await this.repo.findOne({
          where: { email: email, id: Not(id) },
        })
      : Promise.resolve(null);

    const existCrm = crm
      ? await this.repo.findOne({
          where: { crm: crm, id: Not(id) },
        })
      : Promise.resolve(null);

    const [emailResult, crmResult] = await Promise.all([existEmail, existCrm]);

    if (emailResult) {
      throw new CustomError({
        code: "EMAIL_ALREADY_EXIST",
        message: "Este email já está em uso por outro usuário",
        status: 400,
      });
    }

    if (crmResult) {
      throw new CustomError({
        code: "CRM_ALREADY_EXIST",
        message: "Esta crm é utilizada por outro profissional",
        status: 400,
      });
    }

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
