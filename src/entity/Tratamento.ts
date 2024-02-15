import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
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

  @Column()
  valor: number;

  @Column()
  inicio: Date;

  @Column()
  termino: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.tratamentos)
  medico_responsavel: Usuario;

  @OneToOne(() => Paciente, (paciente) => paciente.tratamento) //são vários registro de um mesmo paciente em diferentes momentos
  paciente: Paciente;

  @OneToMany(
    () => AplicacaoMedicamento,
    (aplicacaoMedicamento) => aplicacaoMedicamento.tratamento,
  )
  aplicacoes_medicamentos: AplicacaoMedicamento[];
}
