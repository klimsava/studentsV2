import {ApiProperty} from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    time: number;
}

export class UpdateCourseDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    time: number;
}

export class CreateStudentsDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    age: number;
}

export class UpdateStudentsDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    age: number;
}

export class SelectCourse {
    @ApiProperty()
    studentId: number;
    courseId: number;
}

export class AllCourse {
    @ApiProperty()
    studentId: number;
    time: string;
}