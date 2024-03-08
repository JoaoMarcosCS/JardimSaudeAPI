import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shopping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  quantidade: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor_unitario: number;

  @Column()
  descricao: string;

  @Column("decimal", { precision: 10, scale: 2 })
  peso: number;

  @Column()
  tipo: string;

  @Column()
  codigo: number
}
