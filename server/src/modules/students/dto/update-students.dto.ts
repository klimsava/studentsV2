import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdateStudentsDto {
    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 255)
    @IsString()
    readonly firstName: string;
    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 255)
    @IsString()
    readonly lastName: string;
    @ApiProperty()
    @IsNotEmpty()
    @Length(1, 100)
    readonly age: number;
}
