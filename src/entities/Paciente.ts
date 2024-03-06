import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tratamento } from "./Tratamento";

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  nascimento: Date;

  @Column()
  altura: number;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  cpf: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @OneToMany(() => Tratamento, (tratamento) => tratamento.paciente)
  tratamentos: Tratamento[];
}
