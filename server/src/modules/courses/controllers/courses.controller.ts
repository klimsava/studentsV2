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
    Header,
    ParseIntPipe, HttpStatus
} from '@nestjs/common';
import { Courses } from '../entities/courses.entity';
import { Response } from 'express';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CoursesService } from '../services/courses.service';
import { NotFound } from '../../types/not-found-response.type';
import { BadRequestType } from '../../types/bad-request.type';
import { ApiResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../../common/constants/common.constants';

@ApiTags('Courses')
@Controller('api/courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: [Courses],
        description: 'Show all courses.',
    })
    @ApiNotFoundResponse({ type: NotFound, description: ERROR_MESSAGES.NOT_FOUND })
    async list(@Res() response: Response): Promise<void> {
        const courses = await this.coursesService.list();

        response
            .status(HttpStatus.OK)
            .send(courses.map(val => new Courses(val)));
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Courses,
        description: 'Created new course.',
    })
    @ApiBadRequestResponse({
        type: BadRequestType,
        description: ERROR_MESSAGES.BAD_REQUEST,
    })
    @Header('Cache-Control', 'none')
    async create(@Body() createCourseDto: CreateCourseDto, @Res() response: Response): Promise<void> {
        await this.coursesService.create(createCourseDto);

        response
            .status(HttpStatus.CREATED)
            .send({
                status: true,
                message: 'Added new course.',
            });
    }

    @Put(':id')
    @ApiBadRequestResponse({
        type: UpdateCourseDto,
        description: ERROR_MESSAGES.BAD_REQUEST,
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        type: Courses,
        description: 'Update course.',
    })
    @ApiNotFoundResponse({
        type: NotFound,
        description: ERROR_MESSAGES.NOT_FOUND,
    })
    async update(
        @Param('id') id: number,
        @Body() updateCourseDto: UpdateCourseDto, @Res() response: Response): Promise<void> {

        const course = await this.coursesService.findOne(id);

        if (!course) {
            throw new NotFoundException();
        }

        await this.coursesService.update(Object.assign(course, updateCourseDto));

        response
            .status(HttpStatus.CREATED)
            .send({
                status: true,
                message: 'Course updated successfully!',
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
        const course = await this.coursesService.findOne(id);

        if (!course) {
            throw new NotFoundException();
        }

        await this.coursesService.delete(id);

        response
            .status(HttpStatus.NO_CONTENT)
            .send();
    }
}
