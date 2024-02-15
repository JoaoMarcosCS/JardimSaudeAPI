import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tratamento } from "./Tratamento";
import { Medicamento } from "./Medicamento";

@Entity()
export class AplicacaoMedicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hora_aplicacao: Date;

  @ManyToOne(
    () => Tratamento,
    (tratamento) => tratamento.aplicacoes_medicamentos,
  )
  tratamento: Tratamento;

  @OneToOne(() => Medicamento, (medicamento) => medicamento.aplicacao)
  medicamento: Medicamento;
}
