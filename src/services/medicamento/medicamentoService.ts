import { Medicamento } from "../../entities/Medicamento";
import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { MedicamentoFilter } from "../../enums/medicamentoFilter";
import aplicacao from "../aplicacao/aplicacao";
import { Tratamento } from "../../entities/Tratamento";
import { CustomError } from "express-handler-errors";
import auditoria from "../auditoria/auditoria";

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
  async operation(data: {
    id_medicamento: number;
    id_tratamento: number;
    quantidade: number;
    isAplication: boolean;
  }) {

    const { isAplication, id_medicamento, id_tratamento, quantidade } = data;

    const medicamento = await this.repo.findOne({
      where: {
        id: id_medicamento,
      },
    });

    if (isAplication) {
      if (medicamento.quantidade < quantidade) {
        throw new CustomError({
          code: "INSUFFICIENT_QUANTITY",
          message: "Não há quantidade suficiente desse medicamento para aplicação",
          status: 400,
        });
      }
      await Promise.all([
        aplicacao.create(
          { id: id_medicamento } as Medicamento,
          { id: id_tratamento } as Tratamento,
          quantidade,
        ),
        this.repo
          .createQueryBuilder()
          .update(Medicamento)
          .set({ quantidade: () => "quantidade - 1" })
          .where("id = :id", { id: id_medicamento })
          .execute(),
      ]);
    } else {
      await Promise.all([
        this.repo
          .createQueryBuilder()
          .update(Medicamento)
          .set({ quantidade: () => `quantidade + ${quantidade}` })
          .where("id = :id", { id: id_medicamento })
          .execute(),

        auditoria.compraMedicamento(
          { id: id_medicamento } as Medicamento,
          quantidade,
        ),
      ]);
    }
  }

  // update para aumentar a quantidade em uma compra
  async add() {}
}

export default new MedicamentoService();
