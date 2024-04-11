import { AuditoriaHospital } from "../../../entities/AuditoriaHospital";
import { Usuario } from "../../../entities/Usuario";
import { Operacao } from "../../../enums/auditoriaOpercoes";
import { getBirthday } from "../../../utils/getBirthday";
import faker from "faker-br"
import { medicosData } from "./data/MedicoData";
import { date } from "zod";

const medicos = <Usuario[]>[];
const auditoriasPagamentoMedicos = <AuditoriaHospital[]>[];

const dataAtual = new Date();

const qtdMeses = dataAtual.getMonth() + 13;

for (let i = 0; i < medicosData.length; i++) {
  let pagamentos = <AuditoriaHospital[]>[]
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
  medico.nivel = 2;
  medico.cpf = faker.br.cpf();

  let mes=0, ano=2023;
  for(let i = 0; i < qtdMeses; i++){
    if(mes === 12){
      mes=0;
      ano++;
    }

    const auditoriaPagamentoMedico = new AuditoriaHospital();
    auditoriaPagamentoMedico.data = new Date(ano, mes, 5);
    auditoriaPagamentoMedico.usuario = medico;
    auditoriaPagamentoMedico.tipoOperacao = Operacao.Pagamento;
    auditoriaPagamentoMedico.valor_transacao = medico.salario;

    pagamentos.push(auditoriaPagamentoMedico);
    auditoriasPagamentoMedicos.push(auditoriaPagamentoMedico);

    mes++;
  }

  medico.pagamento = pagamentos;
  medicos.push(medico);
}

export { auditoriasPagamentoMedicos, medicos };
