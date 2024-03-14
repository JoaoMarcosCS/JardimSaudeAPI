import { Usuario } from "../../entities/Usuario";
import connection from "../../database/config/data-source";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Operacao } from "../../enums/auditoriaOpercoes";
import Hospital from "../../entities/Hospital";

export const pagamentosRecebimentos = async () => {
  const verbaGovernamental = 300000;
  const funcionarios = await (await connection).getRepository(Usuario).find({
    where: {
      empregado: true,
    },
  });
  const auditoriasPagamentos = <AuditoriaHospital[]>[];

  funcionarios.forEach((funcionario) => {
    const auditoria = new AuditoriaHospital();
    auditoria.data = new Date();
    auditoria.usuario = funcionario;
    auditoria.tipoOperacao = Operacao.Pagamento;
    auditoria.valor_transacao = Number(funcionario.salario);
    console.log(
      "Funcionário: " +
        funcionario.name +
        "\nSalario: " +
        funcionario.salario +
        "\nNível: " +
        funcionario.nivel,
    );

    auditoriasPagamentos.push(auditoria);
  });

  const hospital = await (await connection).getRepository(Hospital).findOne({
    where: {
      nome: "Jardim Saúde",
    },
  });

  console.log("Orçamento antes do recebimento: " + hospital.orcamento);
  hospital.orcamento = Number(hospital.orcamento) + verbaGovernamental;
  console.log("Orçamento depois do recebimento: " + hospital.orcamento);
  const totalSalario = auditoriasPagamentos.reduce(
    (total, auditoria) => total + auditoria.valor_transacao,
    0,
  );

  console.log("Total a ser debitado: " + totalSalario);
  if (Number(hospital.orcamento) <= totalSalario) {
    console.log("Orçamento insuficiente para realizar pagamento!");
    return false;
  }
  hospital.orcamento = Number(hospital.orcamento) - totalSalario;

  console.log("Orçamento depois do pagamento: " + hospital.orcamento);

  await (await connection)
    .createQueryBuilder()
    .update(Hospital)
    .set({ orcamento: hospital.orcamento })
    .where("nome = :nome", { nome: hospital.nome })
    .execute();

  await (await connection)
    .createQueryBuilder()
    .insert()
    .into(AuditoriaHospital)
    .values(auditoriasPagamentos)
    .execute();

  console.log("Pagamentos realizados!");

  return true;
};
