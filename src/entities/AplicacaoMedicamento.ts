import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tratamento } from "./Tratamento";
import { Medicamento } from "./Medicamento";

@Entity()
export class AplicacaoMedicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamptz" })
  hora_aplicacao: Date;

  @Column()
  quantidade: number;

  @ManyToOne(
    () => Tratamento,
    (tratamento) => tratamento.aplicacoes_medicamentos,
    { cascade: true },
  )
  tratamento: Tratamento;

  @ManyToOne(() => Medicamento, (medicamento) => medicamento.aplicacoes, {
    cascade: true,
  })
  medicamentos: Medicamento;
}
