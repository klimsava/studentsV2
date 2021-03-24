import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Courses } from '../../database/entities/courses.entity';
import { CreateCourseDto } from '../../dto/create-course.dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses)
        private coursesRepository: Repository<Courses>,
    ) {}

    list(): Promise<Courses[]> {
        return this.coursesRepository.find();
    }

    findOne(id: number): Promise<Courses> {
        return this.coursesRepository.findOne(id);
    }

    create(createCourseDto: CreateCourseDto): Promise<Courses> {
        const course = new Courses(createCourseDto);

        return this.coursesRepository.save(course);
    }

    delete(id: number): Promise<DeleteResult> {
        return this.coursesRepository.delete(id);
    }

    update(course: Courses): Promise<Courses> {
        return this.coursesRepository.save(course);
    }
}
