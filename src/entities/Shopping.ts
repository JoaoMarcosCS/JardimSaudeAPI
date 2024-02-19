import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Shopping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column()
  quantidade: number;

  @Column("decimal", { precision: 10, scale: 2 })
  valor_unitario: number;

  @Column()
  descricao: string;

  @Column()
  tipo: string;
}
