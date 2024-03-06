import { Not, QueryFailedError, Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { Usuario } from "../../entities/Usuario";
import bcryptjs from "bcryptjs";
import { Especialidade } from "../../entities/Especialidade";
import { Tratamento } from "../../entities/Tratamento";
import { UserFilter } from "../../enums/userFilter";
import auditoria from "../auditoria/auditoria";
import { Either, error, success } from "../../errors/either";
import { HandleResponseError } from "../../errors/handle-response-errors";

type Response = Either<HandleResponseError, { ok: boolean }>;

class UserService {
  private repo: Repository<Usuario>;

  async initialize() {
    this.repo = (await connection).getRepository(Usuario);
  }

  constructor() {
    this.initialize();
  }

  async index(field: string, order: string) {
    if (field && Object.values(UserFilter).includes(field as UserFilter)) {
      const orderOption = {};
      orderOption[field] = order || "ASC";

      const response = await this.repo.find({
        where: {
          nivel: 2,
        },
        order: orderOption,
        relations: {
          especialidade: true,
        },
      });
      return response;
    } else {
      const response = await this.repo.find({
        where: {
          nivel: 2,
        },
        order: {
          name: "ASC",
        },
        relations: {
          especialidade: true,
        },
      });
      return response;
    }
  }

  async show(id: number) {
    const response = await this.repo.findOne({
      where: {
        id: id,
        nivel: 2,
      },
      relations: {
        especialidade: true,
      },
      select: {
        especialidade: {
          nome: true,
          medicos: false,
        },
      },
    });
    return response;
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
  }): Promise<Response> {
    data.senha = await bcryptjs.hash(data.senha, 10);

    try {
      await this.repo
        .createQueryBuilder()
        .insert()
        .into(Usuario)
        .values(data)
        .execute();

      const userCreated = await this.repo.findOne({
        where: {
          email: data.email,
        },
      });

      await auditoria.pagamentoUsuario(userCreated);

      return success({ ok: true });
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        e.message.includes("duplicate key")
      ) {
        return error(
          new HandleResponseError(
            "Dados já estão em uso por outro usuário",
            400,
          ),
        );
      }
    }
  }

  async delete(id: number): Promise<Response> {
    const response = await this.repo
      .createQueryBuilder()
      .update(Usuario)
      .set({ empregado: false })
      .where("id = :id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(new HandleResponseError("Usuário não encontrado", 404));
    }

    return success({ ok: true });
  }

  async update(
    id: number,
    data: {
      name?: string;
      crm?: string;
      senha?: string;
      email?: string;
      nascimento?: Date;
      nivel?: number;
      salario?: number;
      especialidade?: Especialidade;
      empregado?: boolean;
    },
  ): Promise<Response> {
    const { crm, email } = data;

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
      return error(new HandleResponseError("Este email já está em uso.", 400));
    }

    if (crmResult) {
      return error(
        new HandleResponseError(
          "Esta crm é utilizada por outro profissional",
          400,
        ),
      );
    }

    const response = await this.repo
      .createQueryBuilder()
      .update(Usuario)
      .set(data)
      .where("id = :id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(new HandleResponseError("Usuário não encontrado", 404));
    }

    return success({ ok: true });
  }
}

export default new UserService();
