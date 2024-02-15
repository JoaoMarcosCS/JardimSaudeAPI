import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @Column()
  valor_unitario: number;

  @Column()
  descricao: string;

  @OneToOne(
    () => AplicacaoMedicamento,
    (aplicacaoMedicamentos) => aplicacaoMedicamentos.medicamento,
  )
  aplicacao: AplicacaoMedicamento;

  @OneToMany(
    () => AuditoriaHospital,
    (auditoriaHospital) => auditoriaHospital.medicamento,
  )
  historico_compras: AuditoriaHospital[];
}
