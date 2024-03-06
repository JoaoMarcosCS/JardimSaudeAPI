import { Usuario } from "../entities/Usuario";
import { AplicacaoMedicamento } from "../entities/AplicacaoMedicamento";
import { Paciente } from "../entities/Paciente";

export default interface TratamentoInterface{
    id_medico: Usuario;
    id_paciente: Paciente;
    aplicacoes_medicamentos?: AplicacaoMedicamento[];
    inicio: Date;
    termino?:Date;
    valor:number;
    queixas:string;
    nome: string;

}