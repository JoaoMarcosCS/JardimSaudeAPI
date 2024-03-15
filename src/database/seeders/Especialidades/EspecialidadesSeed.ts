import { Especialidade } from "../../../entities/Especialidade";
import hospital from "../Hospital/HospitaisSeed";
import { especialidadesData } from "./data/EspecialidadesData";

const especialidades = <Especialidade[]>[];

for (let j = 0; j < 10; j++) {
  const especialidade = new Especialidade();
  especialidade.nome = especialidadesData[j].nome;
  especialidade.hospital = hospital;
  especialidades.push(especialidade);
}

export default especialidades;
