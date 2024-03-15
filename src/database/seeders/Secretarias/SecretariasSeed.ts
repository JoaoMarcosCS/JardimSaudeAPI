import { AuditoriaHospital } from "../../../entities/AuditoriaHospital";
import { Usuario } from "../../../entities/Usuario";
import { Operacao } from "../../../enums/auditoriaOpercoes";
import { getBirthday } from "../../../utils/getBirthday";
import { secretariaData } from "./data/SecretariaData";

const secretarias = <Usuario[]>[];
const auditoriasPagamentoSecretarias = <AuditoriaHospital[]>[];

for (let i = 0; i < secretariaData.length; i++) {
  const secretaria = new Usuario();
  secretaria.name = secretariaData[i].name;
  secretaria.email = secretariaData[i].email;
  secretaria.nascimento = getBirthday(Math.floor(Math.random() * 60) + 20);
  secretaria.salario = Math.ceil(
    Number((Math.random() * (5000 - 3000) + 3000).toFixed(2)),
  );
  secretaria.pagamento = [];
  secretaria.tratamentos = [];
  secretaria.nivel = 1;
  secretaria.empregado = true;
  secretaria.senha = secretariaData[i].senha;

  const auditoriaPagamentoSecretaria = new AuditoriaHospital();
  auditoriaPagamentoSecretaria.data = new Date();
  auditoriaPagamentoSecretaria.usuario = secretaria;
  auditoriaPagamentoSecretaria.tipoOperacao = Operacao.Pagamento;
  auditoriaPagamentoSecretaria.valor_transacao = secretaria.salario;

  secretaria.pagamento = [auditoriaPagamentoSecretaria];
  auditoriasPagamentoSecretarias.push(auditoriaPagamentoSecretaria);
  secretarias.push(secretaria);
}

export { auditoriasPagamentoSecretarias, secretarias };
