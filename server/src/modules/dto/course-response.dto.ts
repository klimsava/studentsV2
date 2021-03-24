import { ApiProperty } from '@nestjs/swagger';
import { Courses } from '../database/entities/courses.entity';

export class CourseResponseDto {
    @ApiProperty({
        description: 'The id of course.',
        example: 1,
    })
    readonly id: number;

    @ApiProperty({
        description: 'The name of course.',
        example: 'PHP',
    })
    readonly name: string;

    @ApiProperty({
        description: 'Course description',
        example: 'Training in the programming language PHP.',
    })
    readonly description: string;

    @ApiProperty({
        description: 'Course start time',
        example: '8:00',
    })
    readonly time: string;

    constructor(courseModel: Courses) {
        this.id = courseModel.id;
        this.name = courseModel.name;
        this.description = courseModel.description;
        this.time = courseModel.time;
    }
}
