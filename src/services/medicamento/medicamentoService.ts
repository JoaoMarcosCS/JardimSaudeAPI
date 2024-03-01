import { Medicamento } from "../../entities/Medicamento";
import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { MedicamentoFilter } from "../../enums/medicamentoFilter";

class MedicamentoService {
  private repo: Repository<Medicamento>;

  async initialize() {
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

  //   // update para diminuir a quantidade do medicamento
  //   // fazer validação da quantidade para não ficar negativo
  //   async consume(data: { id: number; qtd: number }) {}

  //   // update para aumentar a quantidade em uma compra
  //   async add() {}
}

export default new MedicamentoService();
