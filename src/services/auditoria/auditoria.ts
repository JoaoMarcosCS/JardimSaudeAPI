import Hospital from "../../entities/Hospital";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Usuario } from "../../entities/Usuario";
import { Medicamento } from "../../entities/Medicamento";
import { Tratamento } from "../../entities/Tratamento";
import { Operacao } from "../../enums/auditoriaOpercoes";
import connection from "../../database/config/data-source";
import { Repository } from "typeorm";

class Auditoria {
  private repo: Repository<Auditoria>

  private async initialize(){
    this.repo = (await connection).getRepository(Auditoria);
  }

  constructor(){
    this.initialize();
  }

  async pagamentoUsuario(usuario: Usuario) {
    if (!usuario.empregado) return null;
    const pagamentoMedico = new AuditoriaHospital();
    pagamentoMedico.data = new Date();
    pagamentoMedico.tipoOperacao = Operacao.Pagamento;
    pagamentoMedico.valor_transacao = usuario.salario;
    pagamentoMedico.usuario = usuario;

    await this.repo.createQueryBuilder().insert().into(AuditoriaHospital)
    .values(pagamentoMedico)
    .execute();
    
    const hospital = await (await connection).getRepository(Hospital).findOne({
      where: {
        nome: "Jardim Saúde",
      },
    });

    console.log("-Orçamento antes do débito: " + hospital.orcamento);

    hospital.orcamento -= pagamentoMedico.valor_transacao;

    const debitadoOrcamento = await (await connection)
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
  }

  async compraMedicamento(medicamento: Medicamento, quantidade: number) {
    const compraMedicamento = new AuditoriaHospital();
    compraMedicamento.data = new Date();
    compraMedicamento.tipoOperacao = Operacao.Compra;
    compraMedicamento.valor_transacao = medicamento.valor_unitario * quantidade;
    compraMedicamento.medicamento = medicamento;

    (await connection)
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(compraMedicamento)
      .execute();

    const hospital = await (await connection).getRepository(Hospital).findOne({
      where: {
        nome: "Jardim Saúde",
      },
    });

    console.log("-Orçamento antes do débito: " + hospital.orcamento);

    hospital.orcamento -= compraMedicamento.valor_transacao;

    const debitadoOrcamento = (await connection)
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
  }

  async recebimentoTratamento(tratamento: Tratamento) {
    const recebimentoTratamento = new AuditoriaHospital();
    recebimentoTratamento.data = new Date();
    recebimentoTratamento.tipoOperacao = Operacao.Pagamento;
    recebimentoTratamento.valor_transacao = tratamento.valor;
    recebimentoTratamento.tratamento = tratamento;

    (await connection)
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(recebimentoTratamento)
      .execute();

    const hospital = await (await connection).getRepository(Hospital).findOne({
      where: {
        nome: "Jardim Saúde",
      },
    });

    console.log("-Orçamento antes do débito: " + hospital.orcamento);

    hospital.orcamento += recebimentoTratamento.valor_transacao;

    const debitadoOrcamento = (await connection)
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
  }
}

export default new Auditoria();
