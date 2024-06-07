
import { In, Not, Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { Shopping } from "../../entities/Shopping";

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

  async index() {
    const response = await this.repo.find({
        order: {
          nome: "ASC",
        },
      });
      return response;
    }
}

export default new ShppingService();
