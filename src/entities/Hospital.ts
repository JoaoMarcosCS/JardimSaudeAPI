import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Especialidade } from "./Especialidade";

@Entity()
export default class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @Column("decimal", { precision: 10, scale: 2 })
  orcamento: number;

  //estabelece a relacao onetomany com a entidade do primeiro argumento
  /*
  especialidades é uma referência à propriedade do lado "muitos" da relação, e especialidades.hospital
   indica que a coluna de chave estrangeira será 
   baseada na propriedade hospital dentro da entidade Especialidade. Então dentro de especialidades,
   nós podemos acessar o hospital ao qual aquela especidade pertence
 */
  //o segundo argumento é para definir como será a chave estrangeira em Hospital para acessar as especialidades relacionada
  @OneToMany(() => Especialidade, (especialidade) => especialidade.hospital, {
    onDelete: "CASCADE",
  })
  especialidades: Especialidade[]; //vai ser uma propriedade(chave estrangeira) de um obejto instanciado e vai ser um array
}
