import { Operacao } from "src/enums/auditoriaOpercoes";

export interface auditoriaInterface {
  operacao: Operacao.Pagamento;
  data: Date;
  valor_transacao: number;
  quantidade?: number;
  usuario_id?: number;
  tratamento_id?: number;
  medicamento_id?: number;
}
