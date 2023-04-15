import { Exclude } from "class-transformer";
import { Cv } from "../../cv/entities/cv.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("User")
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  @Exclude()
  password: string;


  @OneToMany(
    () => Cv,
    (cv) => cv.user,
  )
  cvs: Cv[];
}
