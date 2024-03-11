import { Tratamento } from "../../entities/Tratamento";
import { Repository } from "typeorm";
import connection from "../../database/config/data-source";
import { Either, error, success } from "../../errors/either";
import { HandleResponseError } from "../../errors/handle-response-errors";
import { tratamentosDisponiveis } from "../../enums/tratamentos";
import TratamentoInterface from "../../interface/tratamento-interface";
import auditoria from "../../services/auditoria/auditoria";

type Response = Either<HandleResponseError, { ok: boolean }>;

class TratamentoService {
  private repo: Repository<Tratamento>;

  private async initialize() {
    this.repo = (await connection).getRepository(Tratamento);
  }

  constructor() {
    this.initialize();
  }

  async show(id: number) {
    const tratamento = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        medico_responsavel: true,
        paciente: true,
        aplicacoes_medicamentos: true,
      },
    });

    return tratamento;
  }

  async index(field: string, order: string) {
    if (
      field &&
      Object.values(tratamentosDisponiveis).includes(
        field as tratamentosDisponiveis,
      )
    ) {
      const orderOption = {};
      orderOption[field] = order || "ASC";

      const response = await this.repo.findAndCount({
        order: orderOption,
        relations: {
          medico_responsavel: true,
          paciente: true,
        },
      });
      return response;
    } else {
      const response = await this.repo.find({
        order: {
          nome: "ASC",
        },
        relations: {
          medico_responsavel: true,
          paciente: true,
        },
      });
      return response;
    }
  }

  async create(data: TratamentoInterface) {
  //se nós fazermos a atribuição dessa forma e se não tivermos a validação
  // no schema, não importa se n req enviarmos um number ou objeto
    const tratamento = new Tratamento();
    tratamento.inicio = data.inicio;
    tratamento.valor = data.valor;
    tratamento.nome = data.nome;
    tratamento.queixas = data.queixas;
    tratamento.status = "Em andamento";
    tratamento.termino = data.termino;
    tratamento.aplicacoes_medicamentos = data.aplicacoes_medicamentos;
    tratamento.paciente = data.id_paciente;
    tratamento.medico_responsavel = data.id_medico;
    
    await this.repo.save(tratamento);

    return { ok: true };
  }

  async finishTratamento(id: number): Promise<Response> {
    const response = await this.repo
      .createQueryBuilder()
      .update(Tratamento)
      .set({ status: "Finalizado" })
      .where("id =:id", { id: id })
      .execute();

    if (response.affected == 0) {
      return error(new HandleResponseError("Tratamento não encontrado", 404));
    }

    const tratamento = await this.repo.findOne({
      where:{
        id:id
      }
    })

    tratamento.valor += tratamento.aplicacoes_medicamentos.reduce(
      (custoMedicamentos, medicamento) => custoMedicamentos + (medicamento.medicamento.valor_unitario *  medicamento.quantidade_aplicada),0
    )

    await auditoria.recebimentoTratamento(tratamento)

    return success({ ok: true });
  }

  async cancelTratamento(id: number): Promise<Response> {
    const response = await this.repo
      .createQueryBuilder()
      .update(Tratamento)
      .set({ status: "Cancelado" })
      .where("id =:id", { id: id })
      .execute();

    if (response.affected == 0) {
      return error(new HandleResponseError("Tratamento não encontrado", 404));
    }
    const tratamento = await this.repo.findOne({
      where:{
        id:id
      }
    })

    tratamento.valor += tratamento.aplicacoes_medicamentos.reduce(
      (custoMedicamentos, medicamento) =>
       custoMedicamentos + (medicamento.medicamento.valor_unitario *  medicamento.quantidade_aplicada),0
    )
    
    await auditoria.recebimentoTratamento(tratamento)
    return success({ ok: true });
  }
}
export default new TratamentoService();
