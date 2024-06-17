
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

  async findMedicamentosByNome(nome: string){
    const response = await this.repo.createQueryBuilder("shopping")
    .select(['shopping.nome', 'shopping.codigo', 'shopping.peso'])
    .where('LOWER(shopping.nome) LIKE LOWER(:nome)', { nome: `%${nome}%` })
    .getMany();

    return response;
  }

  async returnDefaultShoppings(){
    const response = await this.repo.createQueryBuilder('shopping')
    .select(['shopping.nome', 'shopping.codigo', 'shopping.peso'])
    .take(5)
    .getMany();

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
