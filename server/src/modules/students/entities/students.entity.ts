import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable, Index
} from 'typeorm';
import { BaseEntity } from '../../../entities/base.entity';
import { Courses } from '../../courses/entities/courses.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('students')
@Index(['firstName', 'lastName'], { unique: true })
export class Students extends BaseEntity {
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
    @ManyToMany(() => Courses, {
        cascade: true,
    })
    @JoinTable({
        name: 'student_courses',
        joinColumn: {
            name: 'studentId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'courseId',
            referencedColumnName: 'id'
        }
    })
    courses: Courses[];
}
