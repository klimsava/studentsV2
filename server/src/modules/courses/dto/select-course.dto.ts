import { ApiProperty } from '@nestjs/swagger';

export class SelectCourse {
    @ApiProperty()
    studentId: number;
    courseId: number;
}
