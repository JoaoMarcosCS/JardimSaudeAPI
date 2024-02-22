import { AuditoriaHospital } from "../../entities/AuditoriaHospital";
import Hospital from "../../entities/Hospital";
import { AppDataSource } from "../config/data-source";
import { Medicamento } from "../../entities/Medicamento";
import * as brcypt from "bcrypt";
import { Usuario } from "../../entities/Usuario";
import { Especialidade } from "../../entities/Especialidade";
import { Shopping } from "../../entities/Shopping";
import { shoppings } from "./Shopping/ShoppingSeed";
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
  hospital.orcamento -= auditoriasPagamentoSecretarias.reduce(
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
      .into(Usuario)
      .values(secretarias)
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
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(AuditoriaHospital)
      .values(auditoriasPagamentoSecretarias)
      .execute();
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Shopping)
      .values(shoppings)
      .execute();

    console.log("Deu certo");
  } catch (e) {
    console.log(e);
  }
};
