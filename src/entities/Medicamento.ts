import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AplicacaoMedicamento } from "./AplicacaoMedicamento";
import { AuditoriaHospital } from "./AuditoriaHospital";

@Entity()
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column("decimal", { precision: 10, scale: 2 })
  peso: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor_unitario: number;

  @Column()
  descricao: string;

  @Column()
  tipo: string;

  @OneToMany(
    () => AplicacaoMedicamento,
    (aplicacaoMedicamentos) => aplicacaoMedicamentos.medicamentos,
    { nullable: true, eager: true, onDelete: "CASCADE" },
  )
  aplicacoes: AplicacaoMedicamento[];

  @OneToMany(
    () => AuditoriaHospital,
    (auditoriaHospital) => auditoriaHospital.medicamento,
    { eager: true, onDelete: "CASCADE" },
  )
  historico_compras: AuditoriaHospital[];
}
