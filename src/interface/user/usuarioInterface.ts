import { Especialidade } from "../../entities/Especialidade";
import { Tratamento } from "../../entities/Tratamento";

interface UsuarioInterface {
  name: string;
    crm?: string;
    senha: string;
    email: string;
    nascimento: Date;
    nivel: number;
    salario: number;
    especialidade?: Especialidade;
    empregado: boolean;
    tratamentos?: Tratamento[];
}


export default UsuarioInterface