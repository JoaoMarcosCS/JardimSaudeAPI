import { Tratamento } from "../../../../../entities/Tratamento";
import { nomesTratamentosFisioterapeuticos } from "./nomes";
import { queixasTratamentos } from "./queixas";
import { addBusinessDays } from "date-fns";


function generateRandomDate(startDate: Date, endDate:Date) {
    return addBusinessDays(startDate, Math.floor(Math.random() * 30));
}

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const tratamentosFisioterapeuticosEmAndamento = <Tratamento[]>[];

let indexQueixas:number;
let indexNomes: number;

for (let i = 0; i < 24; i++) {
    
    indexQueixas = randomInteger(0, (queixasTratamentos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosFisioterapeuticos.length-1));
    const tratamento = new Tratamento();
    tratamento.status = "Em andamento";
    tratamento.valor = nomesTratamentosFisioterapeuticos[indexNomes].valor;
    tratamento.nome = nomesTratamentosFisioterapeuticos[indexNomes].nome;
    tratamento.queixas = queixasTratamentos[indexQueixas];
    tratamento.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));

    tratamentosFisioterapeuticosEmAndamento.push(tratamento);
}

export default tratamentosFisioterapeuticosEmAndamento;