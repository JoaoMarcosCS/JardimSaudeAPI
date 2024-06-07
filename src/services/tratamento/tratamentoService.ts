import { Tratamento } from "../../entities/Tratamento";
import { In, Repository } from "typeorm";
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

  async fetchTotalRegister() {
    const response = await this.repo.count();
    return response;
  }

  async show(id: number) {
    const tratamento = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        medico_responsavel: { especialidade: true },
        paciente: true,
        aplicacoes_medicamentos: {
          medicamento: true,
        },
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
          medico_responsavel: { especialidade: true },
          paciente: true,
          aplicacoes_medicamentos: {
            medicamento: true
          }
        },
      });
      return response;
    } else {
      const response = await this.repo.find({
        order: {
          nome: "ASC",
        },
        relations: {
          medico_responsavel: { especialidade: true },
          paciente: true,
          aplicacoes_medicamentos: {
            medicamento: true
          }
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
    const tratamento = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        aplicacoes_medicamentos: {
          medicamento: true,
        },
      },
    });

    if (!tratamento) {
      return error(new HandleResponseError("Tratamento não encontrado", 404));
    }

    const valorAplicacoes = tratamento.aplicacoes_medicamentos.reduce(
      (custoMedicamentos, aplicacao) =>
        custoMedicamentos +
        aplicacao.medicamento.valor_unitario * aplicacao.quantidade_aplicada,
      0,
    );
    console.log("Valor do tratamento: " + tratamento.valor);
    console.log("Valor das aplicações: " + valorAplicacoes);

    tratamento.valor = Number(tratamento.valor) + valorAplicacoes;

    console.log("Valor final do tratamento: " + tratamento.valor);
    const response = await this.repo
      .createQueryBuilder()
      .update(Tratamento)
      .set({ status: "Finalizado", valor: () => `valor + ${valorAplicacoes}`, termino: new Date() })
      .where("id =:id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(
        new HandleResponseError(
          "Não foi possível finalizar o tratamento!",
          400,
        ),
      );
    }

    await auditoria.recebimentoTratamento(tratamento);

    return success({ ok: true });
  }

  async cancelTratamento(id: number): Promise<Response> {
    const tratamento = await this.repo.findOne({
      where: {
        id: id,
      },
      relations: {
        aplicacoes_medicamentos: {
          medicamento: true,
        },
      },
    });

    if (!tratamento) {
      return error(new HandleResponseError("Tratamento não encontrado", 404));
    }

    const valorAplicacoes = tratamento.aplicacoes_medicamentos.reduce(
      (custoMedicamentos, aplicacao) =>
        custoMedicamentos +
        aplicacao.medicamento.valor_unitario * aplicacao.quantidade_aplicada,
      0,
    );
    console.log("Valor do tratamento: " + tratamento.valor);
    console.log("Valor das aplicações: " + valorAplicacoes);

    tratamento.valor = Number(tratamento.valor) + valorAplicacoes;

    console.log("Valor final do tratamento: " + tratamento.valor);
    const response = await this.repo
      .createQueryBuilder()
      .update(Tratamento)
      .set({ status: "Cancelado", valor: () => `valor + ${valorAplicacoes}`, termino: new Date() })
      .where("id =:id", { id: id })
      .execute();

    if (response.affected === 0) {
      return error(
        new HandleResponseError(
          "Não foi possível finalizar o tratamento!",
          400,
        ),
      );
    }

    await auditoria.recebimentoTratamento(tratamento);

    return success({ ok: true });
  }

  async fetchTotalTratamentoById(medicoId:number){
    const response = await this.repo.count({
      where:{
        medico_responsavel:{
          id: medicoId
        },
        status:In(["Finalizado", "Cancelado"])
      }
    })

    return response;
  }

  async fetchTotalTratamentosCanceladosById(medicoId:number){
    const response = await this.repo.count({
      where:{
        medico_responsavel:{
          id:medicoId
        },
        status:"Cancelado"
      }
    })
    return response;
  }

  async fetchTotalTratamentosEmAndamentoById(medicoId:number){
    const response = await this.repo.count({
      where:{
        medico_responsavel:{
          id:medicoId
        },
        status:"Em andamento"
      }
    })
    return response;
  }

  async fetchTotalTratamentosFinalizadosById(medicoId:number){
    const response = await this.repo.count({
      where:{
        medico_responsavel:{
          id:medicoId
        },
        status:"Finalizado"
      }
    })
    return response;
  }

  async fetchTratamentosFinalizadosById(medicoId:number){
    const response = await this.repo.find({
      where:{
        medico_responsavel:{
          id:medicoId
        },
        status:"Finalizado"
      },
      order:{
        nome:"ASC"
      },
      relations:{
        medico_responsavel:{especialidade:true},
        aplicacoes_medicamentos:{
          medicamento:true
        },
        paciente:true
      }
  })
    return response;
  }

  async fetchTratamentosCanceladosById(medicoId:number){
    const response = await this.repo.find({
      where:{
        medico_responsavel:{
          id:medicoId
        },
        status:"Cancelado"
      },
      order:{
        nome:"ASC"
      },
      relations:{
        medico_responsavel:{especialidade:true},
        aplicacoes_medicamentos:{
          medicamento:true
        },
        paciente:true
      }
    })
    return response;
  }

  async fetchTratamentosEmAndamentoById(medicoId:number){
    const response = await this.repo.find({
      where:{
        medico_responsavel:{
          id:medicoId
        },
        status:"Em andamento"
      },
      order:{
        nome:"ASC"
      },
      relations:{
        medico_responsavel:{especialidade:true},
        aplicacoes_medicamentos:{
          medicamento:true
        },
        paciente:true
      }
    })
    return response;
  }

  // async fetchTotalPacientesByMedicoId(medicoId:number){
  //   const response = await this.repo.query("SELECT COUNT(DISTINCT tratamento.paciente.cpf) as count FROM tratamento WHERE tratamento.medico_responsavel.id = ?",[medicoId])
  //   return response
  // }
}
export default new TratamentoService();
