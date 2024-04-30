import { Tratamento } from "../../../../entities/Tratamento";
import { nomesValores } from "./nomes";
import { queixas } from "./queixas";
import { addBusinessDays } from "date-fns";


function generateRandomDate(startDate: Date, endDate: Date) {
    return addBusinessDays(startDate, Math.floor(Math.random() * 30));
}

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tratamentosPediatricos = <Tratamento[]>[];

let indexQueixas: number;
let indexNomes: number;

for (let i = 0; i < 24; i++) {

    indexQueixas = randomInteger(0, (queixas.length - 1));
    indexNomes = randomInteger(0, (nomesValores.length - 1));
    const tratamentoCancelado = new Tratamento();
    tratamentoCancelado.status = "Cancelado";
    tratamentoCancelado.valor = nomesValores[indexNomes].valor;
    tratamentoCancelado.nome = nomesValores[indexNomes].nome;
    tratamentoCancelado.queixas = queixas[indexQueixas];
    tratamentoCancelado.inicio = generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoCancelado.termino = addBusinessDays(tratamentoCancelado.inicio, Math.floor(Math.random() * 7) + 7);

    indexQueixas = randomInteger(0, (queixas.length - 1));
    indexNomes = randomInteger(0, (nomesValores.length - 1));
    const tratamentoEmAndamento = new Tratamento();
    tratamentoEmAndamento.status = "Em andamento";
    tratamentoEmAndamento.valor = nomesValores[indexNomes].valor;
    tratamentoEmAndamento.nome = nomesValores[indexNomes].nome;
    tratamentoEmAndamento.queixas = queixas[indexQueixas];
    tratamentoEmAndamento.inicio = generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));

    indexQueixas = randomInteger(0, (queixas.length - 1));
    indexNomes = randomInteger(0, (nomesValores.length - 1));
    const tratamentoFinalizado = new Tratamento();
    tratamentoFinalizado.status = "Finalizado";
    tratamentoFinalizado.valor = nomesValores[indexNomes].valor;
    tratamentoFinalizado.nome = nomesValores[indexNomes].nome;
    tratamentoFinalizado.queixas = queixas[indexQueixas];
    tratamentoFinalizado.inicio = generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoFinalizado.termino = addBusinessDays(tratamentoFinalizado.inicio, Math.floor(Math.random() * 7) + 7);
    
    tratamentosPediatricos.push(tratamentoCancelado, tratamentoEmAndamento, tratamentoFinalizado);
}

export default tratamentosPediatricos;