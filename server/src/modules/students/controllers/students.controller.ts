import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Res,
    Param,
    Body,
    NotFoundException,
    ConflictException,
    Header, ParseIntPipe, HttpStatus, HttpException
} from '@nestjs/common';
import { Response } from 'express';
import { Students } from '../../database/entities/students.entity';
import { CreateStudentsDto } from '../../dto/create-students.dto';
import { UpdateStudentsDto } from '../../dto/update-students.dto';
import { SelectCourse } from '../../dto/select-course.dto';
import { StudentsService } from '../services/students.service';
import { ApiBody, ApiResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { NotFound } from '../../types/notFoundResponse';
import { SuccessResponse } from '../../types/successResponse';
import { BadRequest } from '../../types/badRequest';

@ApiTags('students')
@Controller('api/students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
    ) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [Students],
        description: 'Show all students.',
    })
    @ApiNotFoundResponse({ type: NotFound, description: 'Not Found' })
    async list(@Res() response: Response): Promise<void> {
        const students = await this.studentsService.list();

        response
            .status(200)
            .send(students.map(val => new Students(val)));
    }

    @Post()
    @ApiResponse({
        status: 201,
        type: Students,
        description: 'Created new student.',
    })
    @ApiBadRequestResponse({
        type: BadRequest,
        description: 'Bad Request',
    })
    @Header('Cache-Control', 'none')
    async create(@Body() createStudentsDto: CreateStudentsDto, @Res() response: Response): Promise<void>
    {
        const { firstName, lastName } = createStudentsDto;

        const user = await this.studentsService.findStudent(firstName, lastName);

        if (user.length) {
            throw new HttpException('Entity already exists.', HttpStatus.CONFLICT);
        }

        await this.studentsService.create(createStudentsDto);

        response.status(201).send({status: true, message: 'Added new student.'});
    }

    @Put(':id')
    @ApiBody({type: UpdateStudentsDto})
    @ApiResponse({
        status: 200,
        type: Students,
        description: 'Update student.',
    })
    @ApiNotFoundResponse({ type: NotFound, description: 'Not Found' })
    async update(
        @Param('id') id: number,
        @Body() updateStudentsDto: UpdateStudentsDto, @Res() response: Response): Promise<void> {

        const student = await this.studentsService.findOne(id);

        if (!student) {
            throw new NotFoundException();
        }

        await this.studentsService.update(Object.assign(student, updateStudentsDto));

        response.status(200).send({status: true, message: 'Student updated successfully!'});
    }

    @Delete(':id')
    @ApiResponse({
        status: 204,
        description: 'No Content',
    })
    @ApiNotFoundResponse({ type: NotFound, description: 'Not Found' })
    async delete(@Param('id', ParseIntPipe) id: number, @Res() response: Response): Promise<void> {
        const student = await this.studentsService.findOne(id);

        if (!student) {
            throw new NotFoundException();
        }

        await this.studentsService.delete(id);

        response.status(204).send();
    }

    @Post('/chosen-course')
    @ApiBody({type: CreateStudentsDto})
    @ApiResponse({status: 200, description: 'Select new course.', type: Students})
    @ApiResponse({status: 404, description: 'Not Found Error.', type: NotFound})
    @Header('Cache-Control', 'none')
    async selectCourse(@Body() selectCourse: SelectCourse): Promise<SuccessResponse> {
        const allCourse = await this.studentsService.getAllCourseTimeStudent(selectCourse.studentId);
        const courseTime = await this.studentsService.getTimeCourse(selectCourse.courseId);

        if (await this.studentsService.check(allCourse, courseTime)) {
            throw new ConflictException('You already have a course at this time!');
        }

        await this.studentsService.select(selectCourse.studentId, selectCourse.courseId);

        return {
            status: true,
            message: 'The course was successfully selected!',
        };
    }
}
