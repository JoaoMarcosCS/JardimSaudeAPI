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

export const seed = async () => {
  let i = 0;
  for (const medico of medicos) {
    console.log("Senha: " + medico.senha);
    medico.senha = await brcyptjs.hash(medico.senha, 10);
    console.log("Hash: " + medico.senha);
    if (i < especialidades.length) {
      medico.especialidade = especialidades[i];

      i++;
    } else {
      i = 0;
    }
  }
  for (const secretaria of secretarias) {
    console.log("Senha secretaria: " + secretaria.senha);
    secretaria.senha = await brcyptjs.hash(secretaria.senha, 10);
    console.log("Hash secretaria: " + secretaria.senha);
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
