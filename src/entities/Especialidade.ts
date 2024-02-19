import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Hospital from "./Hospital";
import { Usuario } from "./Usuario";

@Entity()
export class Especialidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  //o segundo argumento é para definir como será a chave estrangeira em Hospital para acessar as especialidades relacionada
  @ManyToOne(() => Hospital, (hospital) => hospital.especialidades)
  hospital: Hospital; // vai ser uma propriedade de cada registro

  @OneToMany(() => Usuario, (usuario) => usuario.especialidade)
  medicos: Usuario[];
}
