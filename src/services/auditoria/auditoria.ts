import Hospital from "../../entities/Hospital";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Usuario } from "../../entities/Usuario";
import { Medicamento } from "../../entities/Medicamento";
import { Tratamento } from "../../entities/Tratamento";

class Auditoria {

    async pagamentoUsuario(usuario: Usuario) {
        const pagamentoMedico = new AuditoriaHospital();
        pagamentoMedico.data = new Date();
        pagamentoMedico.tipoOperacao = Operacao.Pagamento;
        pagamentoMedico.valor_transacao = usuario.salario;
        pagamentoMedico.usuario = usuario;

         (await connection)
            .createQueryBuilder()
            .insert()
            .into(AuditoriaHospital)
            .values(pagamentoMedico)
            .execute();

        const hospital = (await connection).getRepository(Hospital).findOne({
            where: {
                nome: "Jardim Saúde"
            }
        })

        console.log("-Orçamento antes do débito: " + hospital.orcamento)

        hospital.orcamento -= pagamentoMedico.valor_transacao;

        const debitadoOrcamento = (await connection).createQueryBuilder()
            .update(Hospital)
            .set({ orcamento: hospital.orcamento })
            .where("nome = :nome", { nome: hospital.nome })
            .execute();

        console.log("-Orçamento atual: " + hospital.orcamento)
    }

    async compraMedicamento(medicamento: Medicamento) {
        const compraMedicamento = new AuditoriaHospital();
        compraMedicamento.data = new Date();
        compraMedicamento.tipoOperacao = Operacao.Compra;
        compraMedicamento.valor_transacao = medicamento.valor_unitario * medicamento.quantidade;
        compraMedicamento.medicamento = medicamento;

         (await connection)
            .createQueryBuilder()
            .insert()
            .into(AuditoriaHospital)
            .values(compraMedicamento)
            .execute();

        const hospital = (await connection).getRepository(Hospital).findOne({
            where: {
                nome: "Jardim Saúde"
            }
        })

        console.log("-Orçamento antes do débito: " + hospital.orcamento)

        hospital.orcamento -= compraMedicamento.valor_transacao;

        const debitadoOrcamento = (await connection).createQueryBuilder()
            .update(Hospital)
            .set({ orcamento: hospital.orcamento })
            .where("nome = :nome", { nome: hospital.nome })
            .execute();

        console.log("-Orçamento atual: " + hospital.orcamento)
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

        const hospital = (await connection).getRepository(Hospital).findOne({
            where: {
                nome: "Jardim Saúde"
            }
        })

        console.log("-Orçamento antes do débito: " + hospital.orcamento)

        hospital.orcamento += recebimentoTratamento.valor_transacao;

        const debitadoOrcamento = (await connection).createQueryBuilder()
            .update(Hospital)
            .set({ orcamento: hospital.orcamento })
            .where("nome = :nome", { nome: hospital.nome })
            .execute();

        console.log("-Orçamento atual: " + hospital.orcamento)
    }

}

export default new Auditoria()