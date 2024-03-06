import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Usuario } from "./Usuario";
import { Paciente } from "./Paciente";
import { AplicacaoMedicamento } from "./AplicacaoMedicamento";

@Entity()
export class Tratamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({ type: "timestamptz" })
  inicio: Date;

  @Column({ type: "timestamptz", nullable: true })
  termino: Date;

  @Column()
  status: string;

  @Column()
  queixas: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.tratamentos, { cascade: true })
  medico_responsavel: Usuario;

  @ManyToOne(() => Paciente, (paciente) => paciente.tratamentos) //são vários registro de um mesmo paciente em diferentes momentos
  paciente: Paciente;

  @OneToMany(
    () => AplicacaoMedicamento,
    (aplicacaoMedicamento) => aplicacaoMedicamento.tratamento,
    { nullable: true, eager: true, onDelete: "CASCADE" },
  )
  aplicacoes_medicamentos: AplicacaoMedicamento[];
}
