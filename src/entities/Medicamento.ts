import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AplicacaoMedicamento } from "./AplicacaoMedicamento";
import { AuditoriaHospital } from "./AuditoriaHospital";

//TODO Criar a coluna peso

//TODO criar a coluna via: oral (boca), retal (ânus), sublingual (embaixo da língua), injetável (intravenoso), dermatológica (pele), nasal (nariz) e oftálmica (olhos)

//TODO fazer um enum para a coluna via

@Entity()
export class Medicamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
    { nullable: true },
  )
  aplicacoes: AplicacaoMedicamento[];

  @OneToMany(
    () => AuditoriaHospital,
    (auditoriaHospital) => auditoriaHospital.medicamento,
  )
  historico_compras: AuditoriaHospital[];
}
