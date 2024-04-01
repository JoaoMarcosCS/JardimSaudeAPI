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

  @Column("decimal", { precision: 10, scale: 2 })
  valor_transacao: number;

  @Column({ type: "timestamptz" })
  data: Date;

  @Column({ nullable: true })
  quantidade: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.pagamento, {
    nullable: true,
    cascade: true,
  })
  usuario: Usuario;

  @ManyToOne(
    () => Medicamento,
    (medicamento) => medicamento.historico_compras,
    { nullable: true, cascade: true },
  )
  medicamento: Medicamento;

  @ManyToOne(() => Tratamento, (tratamento) => tratamento.auditoriasTratamentos, {
    nullable: true,
  })
  tratamento: Tratamento;
}
