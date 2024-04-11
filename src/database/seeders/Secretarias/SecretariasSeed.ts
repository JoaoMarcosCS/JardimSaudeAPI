import { AuditoriaHospital } from "../../../entities/AuditoriaHospital";
import { Usuario } from "../../../entities/Usuario";
import { Operacao } from "../../../enums/auditoriaOpercoes";
import { getBirthday } from "../../../utils/getBirthday";
import { secretariaData } from "./data/SecretariaData";
import faker from "faker-br"

const secretarias = <Usuario[]>[];
const auditoriasPagamentoSecretarias = <AuditoriaHospital[]>[];

const dataAtual = new Date();

const qtdMeses = dataAtual.getMonth() + 13;

for (let i = 0; i < secretariaData.length; i++) {
  let pagamentos = <AuditoriaHospital[]>[]

  const secretaria = new Usuario();
  secretaria.name = secretariaData[i].name;
  secretaria.email = secretariaData[i].email;
  secretaria.cpf = faker.br.cpf()
  secretaria.nascimento = getBirthday(Math.floor(Math.random() * 60) + 20);
  secretaria.salario = Math.ceil(
    Number((Math.random() * (5000 - 3000) + 3000).toFixed(2)),
  );
  secretaria.pagamento = [];
  secretaria.tratamentos = [];
  secretaria.nivel = 1;
  secretaria.empregado = true;
  secretaria.senha = secretariaData[i].senha;
  let mes = 0;
  let ano = 2023;
  for(let i = 0; i < qtdMeses; i++){
    if(mes === 11){
      mes=0;
      ano++;
    }
    const auditoriaPagamentoSecretaria = new AuditoriaHospital();
    auditoriaPagamentoSecretaria.data = new Date(ano, mes, 5);
    auditoriaPagamentoSecretaria.usuario = secretaria;
    auditoriaPagamentoSecretaria.tipoOperacao = Operacao.Pagamento;
    auditoriaPagamentoSecretaria.valor_transacao = secretaria.salario;

    pagamentos.push(auditoriaPagamentoSecretaria);
    auditoriasPagamentoSecretarias.push(auditoriaPagamentoSecretaria);

    mes++;
  }
  
  secretaria.pagamento = pagamentos;
  secretarias.push(secretaria);
}

export { auditoriasPagamentoSecretarias, secretarias };
