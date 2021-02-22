import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm';
import {Courses} from "./courses.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Students {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstName: string;

    @ApiProperty()
    @Column()
    lastName: string;

    @ApiProperty()
    @Column()
    age: number;

    @ApiProperty()
    @ManyToMany(() => Courses)
    @JoinTable({name: 'student_courses'})
    courses: Courses[];
}
