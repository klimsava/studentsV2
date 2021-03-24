import { ApiProperty } from '@nestjs/swagger';

export class BadRequest {
    @ApiProperty({ example: 400 })
    readonly statusCode: number;

    @ApiProperty()
    readonly message: [];

    @ApiProperty({ example: 'Bad Request' })
    readonly error: string;
}
