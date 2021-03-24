import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentsDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    age: number;
}
