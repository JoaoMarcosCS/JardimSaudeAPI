import { AuditoriaHospital } from "../../../entities/AuditoriaHospital";
import { Usuario } from "../../../entities/Usuario";
import { Operacao } from "../../../enums/auditoriaOpercoes";
import { getBirthday } from "../../../utils/getBirthday";
import { medicosData } from "./data/MedicoData";

const medicos = <Usuario[]>[];
const auditoriasPagamentoMedicos = <AuditoriaHospital[]>[];

for (let i = 0; i < medicosData.length; i++) {
  const medico = new Usuario();
  medico.crm = medicosData[i].crm;
  medico.name = medicosData[i].name;
  medico.email = medicosData[i].email;
  medico.senha = medicosData[i].senha;
  medico.empregado = true;
  medico.nascimento = getBirthday(Math.floor(Math.random() * 60) + 20);
  medico.salario = Math.ceil(
    Number((Math.random() * (7000 - 3000) + 3000).toFixed(2)),
  );
  medico.pagamento = [];
  medico.tratamentos = [];
  medico.nivel = 2;

  const auditoriaPagamentoMedico = new AuditoriaHospital();
  auditoriaPagamentoMedico.data = new Date();
  auditoriaPagamentoMedico.usuario = medico;
  auditoriaPagamentoMedico.tipoOperacao = Operacao.Pagamento;
  auditoriaPagamentoMedico.valor_transacao = medico.salario;

  medico.pagamento = [auditoriaPagamentoMedico];
  auditoriasPagamentoMedicos.push(auditoriaPagamentoMedico);
  medicos.push(medico);
}

export { auditoriasPagamentoMedicos, medicos };
