import { Paciente } from "../../entities/Paciente";
import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import PacienteInterface from "../../interface/paciente-interface";
import { HandleResponseError } from "../../errors/handle-response-errors";
import { Either, error, success } from "../../errors/either";
import { PacienteFilter } from "../../enums/pacienteFilter";

type Response = Either<HandleResponseError, { ok: boolean }>;

class PacienteService {
  private repo: Repository<Paciente>;

  private async initialize() {
    this.repo = (await connection).getRepository(Paciente);
  }

  constructor() {
    this.initialize();
  }

  async show(id: number) {
    const response = await this.repo.find({
      where: {
        id: id,
      },
      relations: {
        tratamentos: true,
      },
    });

    return response;
  }

  async index(field: string, order: string) {
    if (
      field &&
      Object.values(PacienteFilter).includes(field as PacienteFilter)
    ) {
      const orderOption = {};
      orderOption[field] = order || "ASC";

      const response = await this.repo.findAndCount({
        order: orderOption,
        relations: {
          tratamentos: true,
        },
      });
      return response;
    } else {
      const response = await this.repo.findAndCount({
        order: {
          nome: "ASC",
        },
        relations: {
          tratamentos: true,
        },
      });
      return response;
    }
  }

  async create(data: PacienteInterface): Promise<Response> {
    const cpfExist = await this.repo.findOne({
      where: {
        cpf: data.cpf,
      },
    });

    if (cpfExist) {
      return error(
        new HandleResponseError(
          "Este cpf já está cadastrado por outro paciente",
          400,
        ),
      );
    }

    await this.repo
      .createQueryBuilder()
      .insert()
      .into(Paciente)
      .values(data)
      .execute();

    return success({ ok: true });
  }
}

export default new PacienteService();
