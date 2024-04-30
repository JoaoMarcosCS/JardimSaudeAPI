import connection from "../config/data-source";
import brcyptjs from "bcryptjs";
import { Usuario } from "../../entities/Usuario";
import {
  auditoriasPagamentoSecretarias,
  secretarias,
} from "./Secretarias/SecretariasSeed";
import { auditoriasPagamentoMedicos, medicos } from "./Medicos/MedicosSeed";
import hospital from "./Hospital/HospitaisSeed";
import {
  auditoriasCompraMedicamentos,
  medicamentos,
} from "./Medicamentos/MedicamentosSeed";
import especialidades from "./Especialidades/EspecialidadesSeed";
import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import { Especialidade } from "../../entities/Especialidade";
import Hospital from "../../entities/Hospital";
import { Medicamento } from "../../entities/Medicamento";
import { Shopping } from "../../entities/Shopping";
import { shoppings } from "./Shopping/ShoppingSeed";
import tratamentosOdontologicos from "./Tratamentos/Odontologia/tratamentos";
import tratamentosCardiacos from "./Tratamentos/Cardiologia/tratamentos";
import tratamentosPediatricos from "./Tratamentos/Pediatria/tratamentos";
import tratamentosOrtopedicos from "./Tratamentos/Ortopedia/tratamentos";
import tratamentosOncologicos from "./Tratamentos/Oncologia/tratamentos";
import tratamentosFisioterapeuticos from "./Tratamentos/Fisioterapia/tratamentos";
import tratamentosUTI from "./Tratamentos/UTI/tratamentos";
import tratamentosOftalmologicos from "./Tratamentos/Oftalmologia/tratamentos";
import tratamentosNefrologicos from "./Tratamentos/Nefrologia/tratamentos";
import tratamentosGastroenterologico from "./Tratamentos/Gastroenterologista/tratamentos";
import pacientes from "./Pacientes/PacienteSeed";
import { Paciente } from "../../entities/Paciente";
import { Tratamento } from "../../entities/Tratamento";
import { Operacao } from "../../enums/auditoriaOpercoes";


export const seed = async () => {

  let i = 0;
  let contagemMedicos = 0;
  for (let p = 0; p < medicos.length; p++) {
    if (i < especialidades.length) {
      medicos[p].especialidade = especialidades[i];
      i++;
      contagemMedicos++;
    } else {
      i = 0;
      medicos[p].especialidade = especialidades[i];
      contagemMedicos++;
      i++;
    }

    medicos[p].senha = await brcyptjs.hash(medicos[p].senha, 10);
  }

  for (const secretaria of secretarias) {
    secretaria.senha = await brcyptjs.hash(secretaria.senha, 10);
  }

  let pacienteIndex = 0;
  const medicosOdontologicos = medicos.filter((medico) => medico.especialidade.nome === "Odontologia");
  let j = 0;
  for (let k = 0; k < tratamentosOdontologicos.length; k++) {

    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosOdontologicos.length) {
      j = 0;
    }
    tratamentosOdontologicos[k].paciente = pacientes[pacienteIndex];
    tratamentosOdontologicos[k].medico_responsavel = medicosOdontologicos[j]
    j++;
    pacienteIndex++;
  }

  const medicosCardiacos = medicos.filter((medico) => medico.especialidade.nome === "Cardiologia");
  j = 0;
  for (let k = 0; k < tratamentosCardiacos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosCardiacos.length) {
      j = 0;
    }
    tratamentosCardiacos[k].medico_responsavel = medicosCardiacos[j]
    tratamentosCardiacos[k].paciente = pacientes[pacienteIndex];
    j++
    pacienteIndex++;

  }

  const medicosPediatras = medicos.filter((medico) => medico.especialidade.nome === "Pediatria");
  j = 0;
  for (let k = 0; k < tratamentosPediatricos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosPediatras.length) {
      j = 0;
    }
    tratamentosPediatricos[k].medico_responsavel = medicosPediatras[j]
    tratamentosPediatricos[k].paciente = pacientes[pacienteIndex];
    j++;
    pacienteIndex++;

  }

  const medicosOrtopedistas = medicos.filter((medico) => medico.especialidade.nome === "Ortopedia");
  j = 0;
  for (let k = 0; k < tratamentosOrtopedicos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosOrtopedistas.length) {
      j = 0;
    }

    tratamentosOrtopedicos[k].medico_responsavel = medicosOrtopedistas[j]
    tratamentosOrtopedicos[k].paciente = pacientes[pacienteIndex];
    j++;
    pacienteIndex++

  }

  const medicosOncologicos = medicos.filter((medico) => medico.especialidade.nome === "Oncologia");
  j = 0;
  for (let k = 0; k < tratamentosOncologicos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosOncologicos.length) {
      j = 0;
    }
    tratamentosOncologicos[k].medico_responsavel = medicosOncologicos[j]
    tratamentosOncologicos[k].paciente = pacientes[pacienteIndex];
    j++
    pacienteIndex++
  }

  const medicosFisioterapeutas = medicos.filter((medico) => medico.especialidade.nome === "Fisioterapia");
  j = 0;
  for (let k = 0; k < tratamentosFisioterapeuticos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosFisioterapeutas.length) {
      j = 0;
    }
    tratamentosFisioterapeuticos[k].medico_responsavel = medicosFisioterapeutas[j]
    tratamentosFisioterapeuticos[k].paciente = pacientes[pacienteIndex];
    j++;
    pacienteIndex++
  }

  const medicosUTI = medicos.filter((medico) => medico.especialidade.nome === "UTI (Unidade de Tratamento Intensivo)");
  j = 0;
  for (let k = 0; k < tratamentosUTI.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosUTI.length) {
      j = 0;
    }

    tratamentosUTI[k].medico_responsavel = medicosUTI[j]
    tratamentosUTI[k].paciente = pacientes[pacienteIndex];
    j++;
    pacienteIndex++

  }

  const medicosOftalmologista = medicos.filter((medico) => medico.especialidade.nome === "Oftalmologia");
  j = 0;
  for (let k = 0; k < tratamentosOftalmologicos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosOftalmologista.length) {
      j = 0;
    }
    tratamentosOftalmologicos[k].medico_responsavel = medicosOftalmologista[j]
    tratamentosOftalmologicos[k].paciente = pacientes[pacienteIndex];
    j++;
    pacienteIndex++

  }

  const medicosNefrologista = medicos.filter((medico) => medico.especialidade.nome === "Nefrologia");
  j = 0;
  for (let k = 0; k < tratamentosNefrologicos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosNefrologista.length) {
      j = 0;
    }

    tratamentosNefrologicos[k].medico_responsavel = medicosNefrologista[j]
    tratamentosNefrologicos[k].paciente = pacientes[pacienteIndex];
    j++;
    pacienteIndex++

  }

  const medicosGastro = medicos.filter((medico) => medico.especialidade.nome === "Gastroenterologista");
  j = 0;
  for (let k = 0; k < tratamentosGastroenterologico.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j === medicosGastro.length) {
      j = 0;
    }
    tratamentosGastroenterologico[k].medico_responsavel = medicosGastro[j]
    tratamentosGastroenterologico[k].paciente = pacientes[pacienteIndex];
    j++
    pacienteIndex++;

  }

  const tratamentos = tratamentosCardiacos.concat(tratamentosFisioterapeuticos, tratamentosGastroenterologico, tratamentosNefrologicos, tratamentosOdontologicos, tratamentosOftalmologicos, tratamentosOncologicos, tratamentosOrtopedicos, tratamentosPediatricos, tratamentosUTI);

  let auditoriasRecebimentoTratamentos = <AuditoriaHospital[]>[];

  const recebimentoTratamentos = Number(tratamentos.reduce((montante, tratamento) => {
    if (tratamento.status === 'Cancelado' || tratamento.status === 'Finalizado') {
      const auditoriaTratamento = new AuditoriaHospital();
      auditoriaTratamento.tipoOperacao = Operacao.Recebimento;
      auditoriaTratamento.data = tratamento.termino;
      auditoriaTratamento.tratamento = tratamento;
      auditoriaTratamento.valor_transacao = tratamento.valor
      auditoriasRecebimentoTratamentos.push(auditoriaTratamento);
      tratamento.auditoriasTratamentos = [auditoriaTratamento];
      return montante + tratamento.valor;
    }
    return montante
  }, 0))



  hospital.especialidades = especialidades;

  hospital.orcamento += recebimentoTratamentos;

  hospital.orcamento -= auditoriasCompraMedicamentos.reduce(
    (total, auditoria) => total + auditoria.valor_transacao,
    0,
  );

  hospital.orcamento -= auditoriasPagamentoMedicos.reduce(
    (total, auditoria) => total + auditoria.valor_transacao,
    0,
  );
  hospital.orcamento -= auditoriasPagamentoSecretarias.reduce(
    (total, auditoria) => total + auditoria.valor_transacao,
    0,
  );

  try {
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Hospital)
      .values(hospital)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Especialidade)
      .values(especialidades)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Paciente)
      .values(pacientes)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Usuario)
      .values(medicos)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Usuario)
      .values(secretarias)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Medicamento)
      .values(medicamentos)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Tratamento)
      .values(tratamentos)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasCompraMedicamentos)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasPagamentoMedicos)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasPagamentoSecretarias)
      .execute();
      await (await connection)
      .createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasRecebimentoTratamentos)
      .execute();
    await (await connection)
      .createQueryBuilder()
      .insert()
      .into(Shopping)
      .values(shoppings)
      .execute();

    console.log("Deu certo");
  } catch (e) {
    console.log(e);
  }
};
