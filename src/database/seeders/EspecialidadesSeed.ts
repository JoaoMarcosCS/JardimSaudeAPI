import { Especialidade } from "../../entities/Especialidade";
import hospital from "./HospitaisSeed";

const especialidadesSeedNomes = [
  { nome: "Odontologia" },
  { nome: "Cardiologia" },
  { nome: "Pediatria" },
  { nome: "Ortopedia" },
  { nome: "Oncologia" },
  { nome: "Fisioterapia" },
  { nome: "UTI (Unidade de Tratamento Intensivo)" },
  { nome: "Oftalmologia" },
  { nome: "Nefrologia" },
  { nome: "Gastroenterologista" },
];

const especialidades = <Especialidade[]>[];

for (let j = 0; j < 10; j++) {
  const especialidade = new Especialidade();
  especialidade.nome = especialidadesSeedNomes[j].nome;
  especialidade.hospital = hospital;
  especialidades.push(especialidade);
}

export default especialidades;
