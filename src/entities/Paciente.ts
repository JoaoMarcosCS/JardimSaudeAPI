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

  @Column("decimal", { precision: 10, scale: 2 })
  altura: number;

  @Column()
  uf: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  rua: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  sexo: string;

  @OneToMany(() => Tratamento, (tratamento) => tratamento.paciente)
  tratamentos: Tratamento[];
}
