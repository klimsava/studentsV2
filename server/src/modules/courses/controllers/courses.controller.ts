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
    ParseIntPipe
} from '@nestjs/common';
import { Courses } from '../../database/entities/courses.entity';
import { Response } from 'express';
import { CreateCourseDto } from '../../dto/create-course.dto';
import { UpdateCourseDto } from '../../dto/update-course.dto';
import { CoursesService } from '../services/courses.service';
import { NotFound } from '../../types/notFoundResponse';
import { BadRequest } from '../../types/badRequest';
import { ApiBody, ApiResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('api/courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Get()
    @ApiResponse({
        status: 200,
        type: [Courses],
        description: 'Show all courses.',
    })
    @ApiNotFoundResponse({ type: NotFound, description: 'Not Found' })
    async list(@Res() response: Response): Promise<void> {
        const courses = await this.coursesService.list();

        response
            .status(200)
            .send(courses.map(val => new Courses(val)));
    }

    @Post()
    @ApiBody({type: CreateCourseDto})
    @ApiResponse({
        status: 201,
        type: Courses,
        description: 'Created new course.',
    })
    @ApiBadRequestResponse({
        type: BadRequest,
        description: 'Bad Request',
    })
    @Header('Cache-Control', 'none')
    async create(@Body() createCourseDto: CreateCourseDto, @Res() response: Response): Promise<void> {
        await this.coursesService.create(createCourseDto);

        response.status(201).send({status: true, message: 'Added new course.'});
    }

    @Put(':id')
    @ApiBody({type: UpdateCourseDto})
    @ApiResponse({
        status: 201,
        type: Courses,
        description: 'Update course.',
    })
    @ApiNotFoundResponse({ type: NotFound, description: 'Not Found' })
    async update(
        @Param('id') id: number,
        @Body() updateCourseDto: UpdateCourseDto, @Res() response: Response): Promise<void> {

        const course = await this.coursesService.findOne(id);

        if (!course) {
            throw new NotFoundException();
        }

        await this.coursesService.update(Object.assign(course, updateCourseDto));

        response.status(201).send({status: true, message: 'Course updated successfully!'});
    }

    @Delete(':id')
    @ApiResponse({
        status: 204,
        description: 'No Content',
    })
    @ApiNotFoundResponse({ type: NotFound, description: 'Not Found' })
    async delete(@Param('id', ParseIntPipe) id: number, @Res() response: Response): Promise<void> {
        const course = await this.coursesService.findOne(id);

        if (!course) {
            throw new NotFoundException();
        }

        await this.coursesService.delete(id);

        response.status(204).send();
    }
}
