import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tratamento } from "./Tratamento";
import { Medicamento } from "./Medicamento";

@Entity()
export class AplicacaoMedicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamptz" })
  hora_aplicacao: Date;

  @ManyToOne(
    () => Tratamento,
    (tratamento) => tratamento.aplicacoes_medicamentos,
  )
  tratamento: Tratamento;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.aplicacoes)
  medicamentos: Medicamento;
}
