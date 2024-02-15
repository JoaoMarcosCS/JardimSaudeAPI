import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Secretaria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  salario: string;
}
