import { Especialidade } from "../../entities/Especialidade";
import { Tratamento } from "../../entities/Tratamento";

interface UsuarioInterface {
  name: string;
  crm?: string;
  senha: string;
  email: string;
  cpf: string;
  nascimento: Date | string;
  nivel: number;
  salario: number;
  id_especialidade?: Especialidade;
  empregado: boolean;
  tratamentos?: Tratamento[];
}


export default UsuarioInterface