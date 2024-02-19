import { Usuario } from "../../entities/Usuario";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Operacao } from "../../enums/auditoriaOpercoes";

const medicosSeedValues = [
  { name: "Ana Silva", email: "ana.silva@gmail.com", crm: "CRM-SP 98765" },
  {
    name: "João Oliveira",
    email: "joao.oliveira@gmail.com",
    crm: "CRM-RJ 54321",
  },
  {
    name: "Maria Santos",
    email: "maria.santos@gmail.com",
    crm: "CRM-MG 12345",
  },
  {
    name: "Pedro Costa",
    email: "pedro.costa@gmail.com",
    crm: "CRM-BA 67890",
  },
  {
    name: "Beatriz Pereira",
    email: "beatriz.pereira@gmail.com",
    crm: "CRM-PR 24680",
  },
  {
    name: "Lucas Souza",
    email: "lucas.souza@gmail.com",
    crm: "CRM-RS 13579",
  },
  {
    name: "Juliana Lima",
    email: "juliana.lima@gmail.com",
    crm: "CRM-SC 87654",
  },
  {
    name: "Rafael Almeida",
    email: "rafael.almeida@gmail.com",
    crm: "CRM-CE 43210",
  },
  {
    name: "Camila Martins",
    email: "camila.martins@gmail.com",
    crm: "CRM-DF 98712",
  },
  {
    name: "Gabriel Ferreira",
    email: "gabriel.ferreira@gmail.com",
    crm: "CRM-ES 65432",
  },
  {
    name: "Larissa Ribeiro",
    email: "larissa.ribeiro@gmail.com",
    crm: "CRM-GO 10987",
  },
  {
    name: "Bruno Carvalho",
    email: "bruno.carvalho@gmail.com",
    crm: "CRM-MA 87651",
  },
  {
    name: "Isabela Cardoso",
    email: "isabela.cardoso@gmail.com",
    crm: "CRM-MS 23456",
  },
  {
    name: "Thiago Miranda",
    email: "thiago.miranda@gmail.com",
    crm: "CRM-MT 78901",
  },
  {
    name: "Amanda Castro",
    email: "amanda.castro@gmail.com",
    crm: "CRM-PA 54329",
  },
  {
    name: "Felipe Miranda",
    email: "felipe.miranda@gmail.com",
    crm: "CRM-PB 87650",
  },
  {
    name: "Fernanda Rocha",
    email: "fernanda.rocha@gmail.com",
    crm: "CRM-PE 32145",
  },
  {
    name: "Gustavo Pereira",
    email: "gustavo.pereira@gmail.com",
    crm: "CRM-PI 90876",
  },
  {
    name: "Carolina Barbosa",
    email: "carolina.barbosa@gmail.com",
    crm: "CRM-RN 45678",
  },
  {
    name: "André Oliveira",
    email: "andre.oliveira@gmail.com",
    crm: "CRM-SE 78923",
  },
];

const medicos = <Usuario[]>[];
const auditoriasPagamentoMedicos = <AuditoriaHospital[]>[];

for (let i = 0; i < medicosSeedValues.length; i++) {
  const medico = new Usuario();
  medico.crm = medicosSeedValues[i].crm;
  medico.name = medicosSeedValues[i].name;
  medico.email = medicosSeedValues[i].email;
  medico.idade = Math.floor(Math.random() * 60) + 20;
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