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
import { Students } from '../entities/students.entity';
import { CreateStudentsDto } from '../dto/create-students.dto';
import { UpdateStudentsDto } from '../dto/update-students.dto';
import { SelectCourse } from '../../courses/dto/select-course.dto';
import { StudentsService } from '../services/students.service';
import { ApiBody, ApiResponse, ApiTags, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { NotFound } from '../../types/not-found-response.type';
import { SuccessResponseType } from '../../types/success-response.type';
import { BadRequestType } from '../../types/bad-request.type';
import { ERROR_MESSAGES } from '../../common/constants/common.constants';

@ApiTags('students')
@Controller('api/students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
    ) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: [Students],
        description: 'Show all students.',
    })
    @ApiNotFoundResponse({
        type: NotFound,
        description: ERROR_MESSAGES.NOT_FOUND,
    })
    async list(@Res() response: Response): Promise<void> {
        const students = await this.studentsService.list();

        response
            .status(HttpStatus.OK)
            .send(students.map(val => new Students(val)));
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Students,
        description: 'Created new student.',
    })
    @ApiBadRequestResponse({
        type: BadRequestType,
        description: ERROR_MESSAGES.BAD_REQUEST,
    })
    @Header('Cache-Control', 'none')
    async create(@Body() createStudentsDto: CreateStudentsDto, @Res() response: Response): Promise<void>
    {
        const { firstName, lastName } = createStudentsDto;

        const user = await this.studentsService.findStudent(firstName, lastName);

        if (user.length) {
            throw new HttpException(ERROR_MESSAGES.CONFLICT, HttpStatus.CONFLICT);
        }

        await this.studentsService.create(createStudentsDto);

        response
            .status(HttpStatus.CREATED)
            .send({
                status: true,
                message: 'Added new student.',
            });
    }

    @Put(':id')
    @ApiBadRequestResponse({
        type: UpdateStudentsDto,
        description: ERROR_MESSAGES.BAD_REQUEST,
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: Students,
        description: 'Update student.',
    })
    @ApiNotFoundResponse({
        type: NotFound,
        description: ERROR_MESSAGES.NOT_FOUND,
    })
    async update(
        @Param('id') id: number,
        @Body() updateStudentsDto: UpdateStudentsDto, @Res() response: Response): Promise<void> {

        const student = await this.studentsService.findOne(id);

        if (!student) {
            throw new NotFoundException();
        }

        const { firstName, lastName } = updateStudentsDto;

        const user = await this.studentsService.findStudent(firstName, lastName);

        if (user.length) {
            throw new HttpException(ERROR_MESSAGES.CONFLICT, HttpStatus.CONFLICT);
        }

        await this.studentsService.update(Object.assign(student, updateStudentsDto));

        response
            .status(HttpStatus.OK)
            .send({
                status: true,
                message: 'Student updated successfully!',
            });
    }

    @Delete(':id')
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No Content',
    })
    @ApiNotFoundResponse({
        type: NotFound,
        description: ERROR_MESSAGES.NOT_FOUND,
    })
    async delete(@Param('id', ParseIntPipe) id: number, @Res() response: Response): Promise<void> {
        const student = await this.studentsService.findOne(id);

        if (!student) {
            throw new NotFoundException();
        }

        await this.studentsService.delete(id);

        response
            .status(HttpStatus.NO_CONTENT)
            .send();
    }

    @Post('/chosen-course')
    @ApiBody({type: CreateStudentsDto})
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Select new course.',
        type: Students,
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: ERROR_MESSAGES.NOT_FOUND,
        type: NotFound,
    })
    @Header('Cache-Control', 'none')
    async selectCourse(@Body() selectCourse: SelectCourse): Promise<SuccessResponseType> {
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
