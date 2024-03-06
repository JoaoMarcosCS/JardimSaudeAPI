import { Medicamento } from "../../entities/Medicamento";
import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { MedicamentoFilter } from "../../enums/medicamentoFilter";
import aplicacao from "../aplicacao/aplicacao";
import { Tratamento } from "../../entities/Tratamento";
import auditoria from "../auditoria/auditoria";
import { Either, error, success } from "../../errors/either";
import { HandleResponseError } from "../../errors/handle-response-errors";

type Response = Either<HandleResponseError, { ok: boolean }>;

class MedicamentoService {
  private repo: Repository<Medicamento>;

  private async initialize() {
    this.repo = (await connection).getRepository(Medicamento);
  }

  constructor() {
    this.initialize();
  }

  // esse método vai criar um novo registro de um novo medicamento
  // no controller precisa fazer uma validação nova se vai criar um medicamento ou atualizar a quantidade
  async create() {}

  async show(id: number) {
    const response = await this.repo.findOne({
      where: {
        id: id,
      },
    });
    return response;
  }

  async index(field: string, order: string) {
    if (
      field &&
      Object.values(MedicamentoFilter).includes(field as MedicamentoFilter)
    ) {
      const orderOption = {};
      orderOption[field] = order || "ASC";

      const response = await this.repo.findAndCount({
        order: orderOption,
      });

      return response;
    } else {
      const response = await this.repo.findAndCount({
        order: {
          nome: "ASC",
        },
      });

      return response;
    }
  }

  // update para diminuir a quantidade do medicamento
  // fazer validação da quantidade para não ficar negativo
  async operation(
    id: number,
    data: {
      id_tratamento?: number;
      quantidade: number;
      isAplication: boolean;
    },
  ): Promise<Response> {
    const { isAplication, id_tratamento, quantidade } = data;

    const medicamento = await this.repo.findOne({
      where: {
        id: id,
      },
    });

    if (!medicamento) {
      return error(new HandleResponseError("Esse medicamento não existe", 404));
    }

    if (isAplication && id_tratamento) {
      if (medicamento.quantidade < quantidade) {
        return error(
          new HandleResponseError(
            "Não há quantidade suficiente desse medicamento para aplicação",
            400,
          ),
        );
      }
      await Promise.all([
        aplicacao.create(
          { id: id } as Medicamento,
          { id: id_tratamento } as Tratamento,
          quantidade,
        ),
        this.repo
          .createQueryBuilder()
          .update(Medicamento)
          .set({ quantidade: () => "quantidade - 1" })
          .where("id = :id", { id: id })
          .execute(),
      ]);

      return success({ ok: true });
    } else {
      await Promise.all([
        this.repo
          .createQueryBuilder()
          .update(Medicamento)
          .set({ quantidade: () => `quantidade + ${quantidade}` })
          .where("id = :id", { id: id })
          .execute(),

        auditoria.compraMedicamento(medicamento, quantidade),
      ]);
      return success({ ok: true });
    }
  }

  // update para aumentar a quantidade em uma compra
  async add() {}
}

export default new MedicamentoService();
