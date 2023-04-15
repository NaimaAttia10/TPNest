import { Cv } from "../../cv/entities/cv.entity"
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity("Skill")
export class Skill {

    @PrimaryGeneratedColumn()
    id : number

    @Column()
    designation : string


    @ManyToMany(
        ()=>Cv,
        (cv)=>cv.skills
    )
    cvs : Cv[]


}
