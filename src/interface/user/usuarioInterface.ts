import { auditoriaInterface } from "./auditoriaInterface";

export interface UsuarioInterface {
  id: number;
  name: string;
  nascimento: Date;
  email: string;
  crm?: string;
  senha: string;
  salario: number;
  nivel: number;
  especialidade_id?: number;
  pagamento: auditoriaInterface[];
}
