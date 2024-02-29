import Hospital from "../../entities/Hospital";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Usuario } from "../../entities/Usuario";

class Auditoria {

    async pagamentoMedico(usuario: Usuario) {
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

}

export default new Auditoria()