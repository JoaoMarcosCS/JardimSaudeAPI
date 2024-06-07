
import { In, Not, Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { PacienteFilter } from "../../enums/pacienteFilter";
import { Shopping } from "@entities/Shopping";

class ShppingService {
  private repo: Repository<Shopping>;

  private async initialize() {
    this.repo = (await connection).getRepository(Shopping);
  }

  constructor() {
    this.initialize();
  }

  async show(id: number) {
    const response = await this.repo.find({
      where: {
        id:id
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

  
}

export default new ShppingService();
