import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import Hospital from "../../entities/Hospital";
//import { Medicamento } from "../../entities/Medicamento";
import { AppDataSource } from "../config/data-source";
import { auditoriasCompraMedicamentos, medicamentos } from "./MedicamentosSeed";
import { Medicamento } from "../../entities/Medicamento";
import hospital from "./HospitaisSeed";
import { medicos, auditoriasPagamentoMedicos } from "./MedicosSeed";
import * as brcypt from "bcrypt";
import especialidades from "./EspecialidadesSeed";
import { Usuario } from "../../entities/Usuario";
import { Especialidade } from "../../entities/Especialidade";

//TODO criar uma lógica para separar os seeds das entidades

//TODO criar pacientes e tratamentos

//TODO criar a entidade "shopping" como os itens disponiveis para adquirir

export const seed = async () => {
  await AppDataSource.initialize();

  let i = 0;
  for (const medico of medicos) {
    medico.senha = await brcypt.hash(
      `${medico.name.replace(" ", "")}12345`,
      10,
    );
    if (i < especialidades.length) {
      medico.especialidade = especialidades[i];
      i++;
    } else {
      i = 0;
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

  try {
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Hospital)
      .values(hospital)
      .execute();
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Especialidade)
      .values(especialidades)
      .execute();
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Usuario)
      .values(medicos)
      .execute();
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Medicamento)
      .values(medicamentos)
      .execute();
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasCompraMedicamentos)
      .execute();
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasPagamentoMedicos)
      .execute();

    console.log("Deu certo");
  } catch (e) {
    console.log(e);
  }
};
