import { ApiProperty } from '@nestjs/swagger';

export class AllCourse {
    @ApiProperty()
    studentId: number;
    time: string;
}
