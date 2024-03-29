import { Tratamento } from "../../../../entities/Tratamento";
import { nomesTratamentosFisioterapeuticos } from "./nomes";
import { queixasTratamentos } from "./queixas";
import { addBusinessDays } from "date-fns";


function generateRandomDate(startDate: Date, endDate:Date) {
    return addBusinessDays(startDate, Math.floor(Math.random() * 30));
}

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const tratamentosFisioterapeuticos = <Tratamento[]>[];

let indexQueixas:number;
let indexNomes: number;

for (let i = 0; i < 24; i++) {
    
    indexQueixas = randomInteger(0, (queixasTratamentos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosFisioterapeuticos.length-1));
    const tratamentoCancelado = new Tratamento();
    tratamentoCancelado.status = "Cancelado";
    tratamentoCancelado.valor = nomesTratamentosFisioterapeuticos[indexNomes].valor;
    tratamentoCancelado.nome = nomesTratamentosFisioterapeuticos[indexNomes].nome;
    tratamentoCancelado.queixas = queixasTratamentos[indexQueixas];
    tratamentoCancelado.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoCancelado.termino = addBusinessDays(tratamentoCancelado.inicio, Math.floor(Math.random() * 7) + 7);

    indexQueixas = randomInteger(0, (queixasTratamentos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosFisioterapeuticos.length-1));
    const tratamentoEmAndamento = new Tratamento();
    tratamentoEmAndamento.status = "Em andamento";
    tratamentoEmAndamento.valor = nomesTratamentosFisioterapeuticos[indexNomes].valor;
    tratamentoEmAndamento.nome = nomesTratamentosFisioterapeuticos[indexNomes].nome;
    tratamentoEmAndamento.queixas = queixasTratamentos[indexQueixas];
    tratamentoEmAndamento.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoEmAndamento.termino = addBusinessDays(tratamentoEmAndamento.inicio, Math.floor(Math.random() * 7) + 7);

    indexQueixas = randomInteger(0, (queixasTratamentos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosFisioterapeuticos.length-1));
    const tratamentoFinalizado = new Tratamento();
    tratamentoFinalizado.status = "Finalizado";
    tratamentoFinalizado.valor = nomesTratamentosFisioterapeuticos[indexNomes].valor;
    tratamentoFinalizado.nome = nomesTratamentosFisioterapeuticos[indexNomes].nome;
    tratamentoFinalizado.queixas = queixasTratamentos[indexQueixas];
    tratamentoFinalizado.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoFinalizado.termino = addBusinessDays(tratamentoFinalizado.inicio, Math.floor(Math.random() * 7) + 7);


    tratamentosFisioterapeuticos.push(tratamentoCancelado, tratamentoEmAndamento, tratamentoFinalizado);
}

export default tratamentosFisioterapeuticos;