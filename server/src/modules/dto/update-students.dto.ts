import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentsDto {
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    age: number;
}
