import Hospital from "../../entities/Hospital";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Usuario } from "../../entities/Usuario";
import { Medicamento } from "../../entities/Medicamento";
import { Tratamento } from "../../entities/Tratamento";
import { Operacao } from "../../enums/auditoriaOpercoes";
import connection from "../../database/config/data-source";
import { Repository } from "typeorm";
import { HandleResponseError } from "../../errors/handle-response-errors";
import { Either, error, success } from "../../errors/either";

type Response = Either<HandleResponseError, { ok: boolean }>;

class Auditoria {
  private repo: Repository<AuditoriaHospital>;
  private hospital: Repository<Hospital>;

  private async initialize() {
    this.repo = (await connection).getRepository(AuditoriaHospital);
    this.hospital = (await connection).getRepository(Hospital);
  }

  constructor() {
    this.initialize();
  }

  async pagamentoUsuario(usuario: Usuario): Promise<Response> {
    if (!usuario.empregado) return null;
    const pagamentoMedico = new AuditoriaHospital();
    pagamentoMedico.data = new Date();
    pagamentoMedico.tipoOperacao = Operacao.Pagamento;
    pagamentoMedico.valor_transacao = usuario.salario;
    pagamentoMedico.usuario = usuario;

    const hospital = await this.hospital.findOne({
      where: {
        nome: "Jardim Saúde",
      },
    });
    console.log("Usuario: " + usuario.name);
    console.log(
      "Salario: " +
        usuario.salario +
        "\nValor da transação: " +
        pagamentoMedico.valor_transacao,
    );
    console.log("Orçamento hospital: " + hospital.orcamento);

    if (hospital.orcamento <= pagamentoMedico.valor_transacao) {
      return error(
        new HandleResponseError("Saldo insuficiente para pagamento", 400),
      );
    }

    await this.repo
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(pagamentoMedico)
      .execute();

    console.log("-Orçamento antes do débito: " + hospital.orcamento);

    hospital.orcamento -= pagamentoMedico.valor_transacao;

    const debitadoOrcamento = await this.hospital
      .createQueryBuilder()
      .update(Hospital)
      .set({ orcamento: hospital.orcamento })
      .where("nome = :nome", { nome: hospital.nome })
      .execute();

    console.log(
      "-Orçamento atual: " +
        hospital.orcamento +
        " | Variavel do response da query: " +
        debitadoOrcamento,
    );

    return success({ ok: true });
  }

  async compraMedicamento(
    medicamento: Medicamento,
    quantidade: number,
  ): Promise<Response> {
    const compraMedicamento = new AuditoriaHospital();
    compraMedicamento.data = new Date();
    compraMedicamento.tipoOperacao = Operacao.Compra;
    compraMedicamento.valor_transacao = medicamento.valor_unitario * quantidade;
    compraMedicamento.medicamento = medicamento;

    const hospital = await this.hospital.findOne({
      where: {
        nome: "Jardim Saúde",
      },
    });

    console.log("Medicamento: " + medicamento.nome);
    console.log(
      "Quantidade: " +
        quantidade +
        "\nValor unitário: " +
        medicamento.valor_unitario,
    );
    console.log("Total transação: " + compraMedicamento.valor_transacao);
    console.log("-Orçamento antes do débito: " + hospital.orcamento);

    if (hospital.orcamento < compraMedicamento.valor_transacao) {
      return error(
        new HandleResponseError("Saldo insuficiente para compra", 400),
      );
    }

    await this.repo
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(compraMedicamento)
      .execute();

    hospital.orcamento -= compraMedicamento.valor_transacao;

    const debitadoOrcamento = await this.hospital
      .createQueryBuilder()
      .update(Hospital)
      .set({ orcamento: hospital.orcamento })
      .where("nome = :nome", { nome: hospital.nome })
      .execute();

    console.log(
      "-Orçamento atual: " +
        hospital.orcamento +
        " | Variavel do response da query: " +
        debitadoOrcamento,
    );

    return success({ ok: true });
  }

  async recebimentoTratamento(tratamento: Tratamento) {
    const recebimentoTratamento = new AuditoriaHospital();
    recebimentoTratamento.data = new Date();
    recebimentoTratamento.tipoOperacao = Operacao.Pagamento;
    recebimentoTratamento.valor_transacao = tratamento.valor;
    recebimentoTratamento.tratamento = tratamento;

    await this.repo
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(recebimentoTratamento)
      .execute();

    const hospital = await this.hospital.findOne({
      where: {
        nome: "Jardim Saúde",
      },
    });

    console.log("-Orçamento antes do recebimento: " + hospital.orcamento);

    hospital.orcamento += recebimentoTratamento.valor_transacao;

    const debitadoOrcamento = await this.hospital
      .createQueryBuilder()
      .update(Hospital)
      .set({ orcamento: hospital.orcamento })
      .where("nome = :nome", { nome: hospital.nome })
      .execute();

    console.log(
      "-Orçamento atual: " +
        hospital.orcamento +
        " | Variavel do response da query: " +
        debitadoOrcamento,
    );

    return success({ ok: true });
  }
}

export default new Auditoria();
