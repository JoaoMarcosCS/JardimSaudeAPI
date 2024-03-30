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

//TODO é necessário colocar as entidades para serem cadastradas na query

export const seed = async () => {

  let i = 0;
  for (const medico of medicos) {
    if (i < especialidades.length) {
      medico.especialidade = especialidades[i];
      i++;
    } else {
      i = 0;
    }
    console.log("Senha: " + medico.senha);
    medico.senha = await brcyptjs.hash(medico.senha, 10);
    console.log("Hash: " + medico.senha);
  }
  for (const secretaria of secretarias) {
    console.log("Senha secretaria: " + secretaria.senha);
    secretaria.senha = await brcyptjs.hash(secretaria.senha, 10);
    console.log("Hash secretaria: " + secretaria.senha);
  }

  let pacienteIndex = 0;
  const medicosOdontologicos = medicos.filter((medico) => medico.especialidade.nome === "Odontologia");
  let j = 0;
  for (let k = 0; k < tratamentosOdontologicos.length; k++) {

    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosOdontologicos.length) {
      tratamentosOdontologicos[k].paciente = pacientes[pacienteIndex];
      tratamentosOdontologicos[k].medico_responsavel = medicosOdontologicos[j]
      j++;
      pacienteIndex++;
    } else {
      j = 0;
      pacienteIndex++;
    }
  }

  const medicosCardiacos = medicos.filter((medico) => medico.especialidade.nome === "Cardiologia");
  j = 0;
  for (let k = 0; k < tratamentosCardiacos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosCardiacos.length) {
      tratamentosCardiacos[k].medico_responsavel = medicosCardiacos[j]
      j++;
      pacienteIndex++;
    } else {
      j = 0;
      pacienteIndex++;
    }
  }

  const medicosPediatras = medicos.filter((medico) => medico.especialidade.nome === "Pediatria");
  j = 0;
  for (let k = 0; k < tratamentosPediatricos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosPediatras.length) {
      tratamentosPediatricos[k].medico_responsavel = medicosPediatras[j]
      j++;
      pacienteIndex++;
    } else {
      j = 0;
      pacienteIndex++
    }
  }

  const medicosOrtopedistas = medicos.filter((medico) => medico.especialidade.nome === "Ortopedia");
  j = 0;
  for (let k = 0; k < tratamentosOrtopedicos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosOrtopedistas.length) {
      tratamentosOrtopedicos[k].medico_responsavel = medicosOrtopedistas[j]
      j++;
      pacienteIndex++
    } else {
      j = 0;
      pacienteIndex++
    }
  }

  const medicosOncologicos = medicos.filter((medico) => medico.especialidade.nome === "Oncologia");
  j = 0;
  for (let k = 0; k < tratamentosOncologicos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosOncologicos.length) {
      tratamentosOncologicos[k].medico_responsavel = medicosOncologicos[j]
      j++
      pacienteIndex++
    } else {
      j = 0;
      pacienteIndex++
    }
  }

  const medicosFisioterapeutas = medicos.filter((medico) => medico.especialidade.nome === "Fisioterapia");
  j = 0;
  for (let k = 0; k < tratamentosFisioterapeuticos.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosFisioterapeutas.length) {
      tratamentosFisioterapeuticos[k].medico_responsavel = medicosFisioterapeutas[j]
      j++;
      pacienteIndex++
    } else {
      j = 0;
      pacienteIndex++;
    }
  }

  const medicosUTI = medicos.filter((medico) => medico.especialidade.nome === "UTI (Unidade de Tratamento Intensivo)");
  j = 0;
  for (let k = 0; k < tratamentosUTI.length; k++) {
    if (pacienteIndex === pacientes.length) {
      pacienteIndex = 0;
    }
    if (j < medicosUTI.length) {
      tratamentosUTI[k].medico_responsavel = medicosUTI[j]
      j++;
      pacienteIndex++
    } else {
      j = 0;
      pacienteIndex++;
    }
  }

  const medicosOftalmologista = medicos.filter((medico) => medico.especialidade.nome === "Oftalmologia");
  j = 0;
  for (let k = 0; k < tratamentosOftalmologicos.length; k++) {
    if(pacienteIndex === pacientes.length){
      pacienteIndex = 0;
    }
    if (j < medicosOftalmologista.length) {
      tratamentosOftalmologicos[k].medico_responsavel = medicosOftalmologista[j]
      j++;
      pacienteIndex++
    } else {
      j = 0;
      pacienteIndex++
    }
  }

  const medicoNefrologista = medicos.filter((medico) => medico.especialidade.nome === "Nefrologia");
  j = 0;
  for (let k = 0; k < tratamentosNefrologicos.length; k++) {
    if(pacienteIndex === pacientes.length){
      pacienteIndex = 0;
    }
    if (j < medicoNefrologista.length) {
      tratamentosNefrologicos[k].medico_responsavel = medicoNefrologista[j]
      j++;
      pacienteIndex++
    } else {
      j = 0;
      pacienteIndex++;
    }
  }

  const medicoGastro = medicos.filter((medico) => medico.especialidade.nome === "Gastroenterologista");
  j = 0;
  for (let k = 0; k < tratamentosGastroenterologico.length; k++) {
    if(pacienteIndex === pacientes.length){
      pacienteIndex = 0;
    }
    if (j < medicoGastro.length) {
      tratamentosGastroenterologico[k].medico_responsavel = medicoGastro[j]
      j++
      pacienteIndex++;
    } else {
      j = 0;
      pacienteIndex++;
    }
  }

  hospital.especialidades = especialidades;

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
      .into(Shopping)
      .values(shoppings)
      .execute();

    console.log("Deu certo");
  } catch (e) {
    console.log(e);
  }
};
