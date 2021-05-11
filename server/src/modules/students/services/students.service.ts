import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, getCustomRepository } from 'typeorm';
import { Students } from '../entities/students.entity';
import { CreateStudentsDto } from '../dto/create-students.dto';
import { CourseTimeService } from './course-time.service';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Students)
        private studentsRepository: Repository<Students>,
        private readonly courseTimeService: CourseTimeService,
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
        const courseTimeService = getCustomRepository(CourseTimeService);

        return courseTimeService.selectCourse(studentId, courseId);
    }

    async getAllCourseTimeStudent(studentId: number): Promise<any[]> {
        return this.courseTimeService.allCourseTimeStudent(studentId);
    }

    async getTimeCourse(courseId: number): Promise<any> {
        return this.courseTimeService.timeCourse(courseId);
    }

    async check(allCourses: any, timeOfSelectedCourse: string): Promise<any> {
        return this.courseTimeService.checkExistCourse(allCourses, timeOfSelectedCourse);
    }
};
