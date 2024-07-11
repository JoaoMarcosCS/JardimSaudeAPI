
import { In, Not, Repository } from "typeorm";
import connection from "../../database/config/data-source";
import PacienteInterface from "../../interface/paciente-interface";
import { HandleResponseError } from "../../errors/handle-response-errors";
import { Either, error, success } from "../../errors/either";
import { PacienteFilter } from "../../enums/pacienteFilter";
import { Paciente } from "../../entities/Paciente";

type Response = Either<HandleResponseError, { ok: boolean }>;

class PacienteService {
  private repo: Repository<Paciente>;

  private async initialize() {
    this.repo = (await connection).getRepository(Paciente);
  }

  constructor() {
    this.initialize();
  }

  async returnTotalRegister() {
    const response = await this.repo.count();
    return response;
  }

  async findPacienteByCPF(cpf: string) {
    const response = await this.repo.findOne({
      where: {
        cpf: cpf
      }
    })

    return response;
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
          tratamentos: {
            medico_responsavel: true
          },

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

  async update(
    id: number,
    data: {
      nome?: string;
      sexo?: string;
      nascimento?: Date;
      altura?: number;
      uf?: string;
      cidade?: string;
      bairro?: string;
      rua?: string;
      cpf?: string;
      telefone?: string;
      email?: string;
    },
  ): Promise<Response> {
    const { cpf, email } = data;

    const existEmail = email
      ? await this.repo.findOne({
        where: { email: email, id: Not(id) },
      })
      : Promise.resolve(null);

    const existCpf = cpf
      ? await this.repo.findOne({
        where: { cpf: cpf, id: Not(id) },
      })
      : Promise.resolve(null);

    const [emailResult, cpfResult] = await Promise.all([existEmail, existCpf]);

    if (emailResult) {
      return error(new HandleResponseError("Este email já está em uso.", 400));
    }

    if (cpfResult) {
      return error(
        new HandleResponseError(
          "Esta cpf já é utilizada por outro paciente",
          400,
        ),
      );
    }

    const response = await this.repo
      .createQueryBuilder()
      .update(Paciente)
      .set(data)
      .where("id = :id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(new HandleResponseError("Usuário não encontrado", 404));
    }

    return success({ ok: true });
  }

  async fetchTotalPacientesByMedicoId(medicoId: number) {
    const response = await this.repo.count({
      where: {
        tratamentos: {
          status: In(["Finalizado", "Cancelado"]),
          medico_responsavel: {
            id: medicoId
          }
        }
      }
    });
    return response;
  }
  async

  async fetchPacientesByMedicoId(medicoId: number) {
    const response = await this.repo.find({
      where: {
        tratamentos: {
          medico_responsavel: {
            id: medicoId
          },
          status: In(["Finalizado", "Cancelado"])
        }
      },
      order: {
        nome: "ASC"
      },
      relations: {
        tratamentos: {
          medico_responsavel: {
            especialidade: true
          },
          paciente: true

        }
      }
    });

    return response;
  }

}

export default new PacienteService();
