import { Tratamento } from "../../../../entities/Tratamento";
import { nomesTratamentosCardiacos } from "./nomes";
import { queixasTratamentosCardiacos } from "./queixas";
import { addBusinessDays } from "date-fns";


function generateRandomDate(startDate: Date, endDate:Date) {
    return addBusinessDays(startDate, Math.floor(Math.random() * 30));
}

function randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

const tratamentosCardiacos = <Tratamento[]>[];

let indexQueixas:number;
let indexNomes: number;

for (let i = 0; i < 34; i++) {
    
    indexQueixas = randomInteger(0, (queixasTratamentosCardiacos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosCardiacos.length-1));
    const tratamentoCancelados = new Tratamento();
    tratamentoCancelados.status = "Cancelado";
    tratamentoCancelados.valor = nomesTratamentosCardiacos[indexNomes].valor;
    tratamentoCancelados.nome = nomesTratamentosCardiacos[indexNomes].nome;
    tratamentoCancelados.queixas = queixasTratamentosCardiacos[indexQueixas];
    tratamentoCancelados.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoCancelados.termino = addBusinessDays(tratamentoCancelados.inicio, Math.floor(Math.random() * 7) + 7);

    indexQueixas = randomInteger(0, (queixasTratamentosCardiacos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosCardiacos.length-1));
    const tratamentoEmAndamento = new Tratamento();
    tratamentoEmAndamento.status = "Em andamento";
    tratamentoEmAndamento.valor = nomesTratamentosCardiacos[indexNomes].valor;
    tratamentoEmAndamento.nome = nomesTratamentosCardiacos[indexNomes].nome;
    tratamentoEmAndamento.queixas = queixasTratamentosCardiacos[indexQueixas];
    tratamentoEmAndamento.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));

    indexQueixas = randomInteger(0, (queixasTratamentosCardiacos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosCardiacos.length-1));
    const tratamentoFinalizado = new Tratamento();
    tratamentoFinalizado.status = "Finalizado";
    tratamentoFinalizado.valor = nomesTratamentosCardiacos[indexNomes].valor;
    tratamentoFinalizado.nome = nomesTratamentosCardiacos[indexNomes].nome;
    tratamentoFinalizado.queixas = queixasTratamentosCardiacos[indexQueixas];
    tratamentoFinalizado.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoFinalizado.termino = addBusinessDays(tratamentoFinalizado.inicio, Math.floor(Math.random() * 7) + 7);


    tratamentosCardiacos.push(tratamentoCancelados, tratamentoEmAndamento,tratamentoFinalizado);
}

export default tratamentosCardiacos;