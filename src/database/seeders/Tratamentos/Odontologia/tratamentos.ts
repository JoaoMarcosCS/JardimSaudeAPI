import { Tratamento } from "../../../../entities/Tratamento";
import { nomesTratamentosOdontologicos } from "./nomes";
import { queixasTratamentosOdontologicos } from "./queixas";
import { addBusinessDays } from "date-fns";

//gera datas com dias uteis
function generateRandomDate(startDate: Date, endDate:Date) {
    return addBusinessDays(startDate, Math.floor(Math.random() * 30));
}

function randomInteger(min:number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const tratamentosOdontologicos = <Tratamento[]>[];

let indexQueixas:number;
let indexNomes: number;

for (let i = 0; i < 73; i++) {
    
    indexQueixas = randomInteger(0, (queixasTratamentosOdontologicos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosOdontologicos.length-1));
    const tratamentoCancelado = new Tratamento();
    tratamentoCancelado.status = "Cancelado";
    tratamentoCancelado.valor = nomesTratamentosOdontologicos[indexNomes].valor;
    tratamentoCancelado.nome = nomesTratamentosOdontologicos[indexNomes].nome;
    tratamentoCancelado.queixas = queixasTratamentosOdontologicos[indexQueixas];
    tratamentoCancelado.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoCancelado.termino = addBusinessDays(tratamentoCancelado.inicio, Math.floor(Math.random() * 7) + 7); // Pelo menos uma semana de tratamento

    indexQueixas = randomInteger(0, (queixasTratamentosOdontologicos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosOdontologicos.length-1));
    const tratamentoEmAndamento = new Tratamento();
    tratamentoEmAndamento.status = "Em andamento";
    tratamentoEmAndamento.valor = nomesTratamentosOdontologicos[indexNomes].valor;
    tratamentoEmAndamento.nome = nomesTratamentosOdontologicos[indexNomes].nome;
    tratamentoEmAndamento.queixas = queixasTratamentosOdontologicos[indexQueixas];
    tratamentoEmAndamento.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));

    indexQueixas = randomInteger(0, (queixasTratamentosOdontologicos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosOdontologicos.length-1));
    const tratamentoFinalizado = new Tratamento();
    tratamentoFinalizado.status = "Finalizado";
    tratamentoFinalizado.valor = nomesTratamentosOdontologicos[indexNomes].valor;
    tratamentoFinalizado.nome = nomesTratamentosOdontologicos[indexNomes].nome;
    tratamentoFinalizado.queixas = queixasTratamentosOdontologicos[indexQueixas];
    tratamentoFinalizado.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoFinalizado.termino = addBusinessDays(tratamentoFinalizado.inicio, Math.floor(Math.random() * 7) + 7); // Pelo menos uma semana de tratamento


    tratamentosOdontologicos.push(tratamentoCancelado, tratamentoEmAndamento, tratamentoFinalizado);
}

export default tratamentosOdontologicos;