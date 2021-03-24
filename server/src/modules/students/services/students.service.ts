import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, getCustomRepository } from 'typeorm';
import { Students } from '../../database/entities/students.entity';
import { CreateStudentsDto } from '../../dto/create-students.dto';
import { CourseTimeRepository } from '../studentsRepository/courseTime.repository';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Students)
        private studentsRepository: Repository<Students>,
        private readonly courseTimeRepository: CourseTimeRepository,
    ) {}

    list(): Promise<Students[]> {
        return this.studentsRepository.find();
    }

    findOne(id: number): Promise<Students> {
        return this.studentsRepository.findOne(id);
    }

    findStudent(firstName: string, lastName: string): Promise<Students[]> {
        return this.studentsRepository.find({
            where: {
                firstName,
                lastName
            },
        });
    }

    create(createStudentsDto: CreateStudentsDto): Promise<Students> {
        const student = new Students(createStudentsDto);

        return this.studentsRepository.save(student);
    }

    update(student: Students): Promise<Students> {
        return this.studentsRepository.save(student);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.studentsRepository.delete(id);
    }

    async select(studentId: number, courseId: number): Promise<void> {
        const courseTimeRepository = getCustomRepository(CourseTimeRepository);

        return courseTimeRepository.selectCourse(studentId, courseId);
    }

    async getAllCourseTimeStudent(studentId: number): Promise<any[]> {
        return this.courseTimeRepository.allCourseTimeStudent(studentId);
    }

    async getTimeCourse(courseId: number): Promise<any> {
        return this.courseTimeRepository.timeCourse(courseId);
    }

    async check(allCourses: any, timeOfSelectedCourse: string): Promise<any> {
        return this.courseTimeRepository.checkExistCourse(allCourses, timeOfSelectedCourse);
    }
};
