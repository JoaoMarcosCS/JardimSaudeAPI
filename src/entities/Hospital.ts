import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Especialidade } from "./Especialidade";

@Entity()
export default class Hospital {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  leitos_disponiveis: number;

  @Column()
  orcamento: number;

  //estabelece a relacao onetomany com a entidade do primeiro argumento
  /*
  especialidades é uma referência à propriedade do lado "muitos" da relação, e especialidades.hospital
   indica que a coluna de chave estrangeira será 
   baseada na propriedade hospital dentro da entidade Especialidade. Então dentro de especialidades,
   nós podemos acessar o hospital ao qual aquela especidade pertence
 */
  //o segundo argumento é para definir como será a chave estrangeira em Hospital para acessar as especialidades relacionada
  @OneToMany(() => Especialidade, (especialidade) => especialidade.hospital)
  especialidades: Especialidade[]; //vai ser uma propriedade(chave estrangeira) de um obejto instanciado e vai ser um array
}
