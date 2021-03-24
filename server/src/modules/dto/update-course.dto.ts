import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class UpdateCourseDto {
    @IsNotEmpty()
    @Length(1, 255)
    @ApiProperty({
            description: 'The unique name of course.',
            example: 'PHP',
        }
    )
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    time: string;
}
