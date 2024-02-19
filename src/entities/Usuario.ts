import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Especialidade } from "./Especialidade";
import { Tratamento } from "./Tratamento";
import { AuditoriaHospital } from "./AuditoriaHospital";

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  idade: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, unique: true })
  crm: string;

  @Column({ unique: true })
  senha: string;

  @Column("decimal", { precision: 10, scale: 2 })
  salario: number;

  @Column()
  nivel: number;

  @ManyToOne(() => Especialidade, (especialidade) => especialidade.medicos, {
    nullable: true,
  })
  especialidade: Especialidade;

  @OneToMany(() => Tratamento, (tratamento) => tratamento.medico_responsavel, {
    nullable: true,
  })
  tratamentos: Tratamento[];

  @OneToMany(
    () => AuditoriaHospital,
    (auditoriaHospital) => auditoriaHospital.usuario,
  )
  pagamento: AuditoriaHospital[];
}
