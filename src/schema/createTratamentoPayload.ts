import TratamentoInterface from "../interface/tratamento-interface";
import {  z } from "zod";

// const Medico = z.object({
//   id: z.number({ required_error: "Informe o id de uma especialidade" }),
// });

// const Paciente = z.object({
//   id: z.number({ required_error: "Informe o id de uma especialidade" }),
// });

const createTratamentoPayload= z.object({
  nome: z.string({ required_error: "Informe o nome do tratamento" }),
  queixas: z.string().optional(),
  inicio: z.string({ required_error: "Informe uma data de inicio de tratamento " }),
  termino: z.string().optional(),
  valor: z.number({ required_error: "Informe o valor do tratamento " }),
  status:z.string(),
});

export default createTratamentoPayload;
