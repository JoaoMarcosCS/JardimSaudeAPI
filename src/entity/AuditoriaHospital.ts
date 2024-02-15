import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Operacao } from "../enums/auditoriaOpercoes";
import { Usuario } from "./Usuario";
import { Medicamento } from "./Medicamento";
import { Tratamento } from "./Tratamento";

@Entity()
export class AuditoriaHospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: Operacao })
  tipoOperacao: Operacao;

  @Column()
  valor_transacao: number;

  @Column()
  data: Date;

  @Column({ nullable: true })
  quantidade: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pagamento, { nullable: true })
  usuario: Usuario;

  @ManyToOne(
    () => Medicamento,
    (medicamento) => medicamento.historico_compras,
    { nullable: true },
  )
  medicamento: Medicamento;

  @OneToOne(() => Tratamento, (tratamento) => tratamento.valor)
  tratamento: Tratamento;
}
