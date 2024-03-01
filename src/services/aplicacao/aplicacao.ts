import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { AplicacaoMedicamento } from "../../entities/AplicacaoMedicamento";
import { Medicamento } from "../../entities/Medicamento";
import { Tratamento } from "src/entities/Tratamento";

class Aplicacao {
  private repo: Repository<AplicacaoMedicamento>;

  async initialize() {
    this.repo = (await connection).getRepository(AplicacaoMedicamento);
  }

  constructor() {
    this.initialize();
  }

  async create(
    medicamento: Medicamento,
    tratamento: Tratamento,
    quantidade: number,
  ) {
    const aplicacao = new AplicacaoMedicamento();
    aplicacao.hora_aplicacao = new Date();
    aplicacao.medicamentos = medicamento;
    aplicacao.tratamento = tratamento;
    aplicacao.quantidade = quantidade;

    const response = await this.repo
      .createQueryBuilder()
      .insert()
      .into(AplicacaoMedicamento)
      .values(aplicacao)
      .execute();

    return response;
  }
}

export default new Aplicacao();
