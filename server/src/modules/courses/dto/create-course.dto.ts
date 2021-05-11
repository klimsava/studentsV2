import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsString } from 'class-validator';
import { IsUniqueValidators } from '../../common/constraint/is-unique-constraint';
import { Courses } from '../entities/courses.entity'

export class CreateCourseDto {
    @IsUniqueValidators(Courses, 'name')
    @IsNotEmpty()
    @Length(1, 255)
    @IsString()
    @ApiProperty({
        description: 'The unique name of course.',
        example: 'PHP',
    })
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly time: string;
}
