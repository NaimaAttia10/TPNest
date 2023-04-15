import { Skill } from "../../skill/entities/skill.entity";
import { User } from "../../user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("Cv")
export class Cv {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50
  })
  name: string;

  @Column({
    length: 50
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: string;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(
    () => User,
    (user) => user.cvs,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true
    }
  )

  @ManyToMany(
    ()=>Skill,
    (skill)=>skill.cvs,
    {
        eager: true
    }
)
@JoinTable()
skills : Skill[]
  user: User;

}