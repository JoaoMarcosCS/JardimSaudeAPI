import { Tratamento } from "../../../../../entities/Tratamento";
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

const tratamentosOdontologicosCancelados = <Tratamento[]>[];

let indexQueixas:number;
let indexNomes: number;

for (let i = 0; i < 73; i++) {
    
    indexQueixas = randomInteger(0, (queixasTratamentosOdontologicos.length-1));
    indexNomes = randomInteger(0,(nomesTratamentosOdontologicos.length-1));
    const tratamentoOdontologico = new Tratamento();
    tratamentoOdontologico.status = "Cancelado";
    tratamentoOdontologico.valor = nomesTratamentosOdontologicos[indexNomes].valor;
    tratamentoOdontologico.nome = nomesTratamentosOdontologicos[indexNomes].nome;
    tratamentoOdontologico.queixas = queixasTratamentosOdontologicos[indexQueixas];
    tratamentoOdontologico.inicio =  generateRandomDate(new Date(2023, 0, 1), new Date(2024, 1, 29));
    tratamentoOdontologico.termino = addBusinessDays(tratamentoOdontologico.inicio, Math.floor(Math.random() * 7) + 7); // Pelo menos uma semana de tratamento

    tratamentosOdontologicosCancelados.push(tratamentoOdontologico);
}

export default tratamentosOdontologicosCancelados;