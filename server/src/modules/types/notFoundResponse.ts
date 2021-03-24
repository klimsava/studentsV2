import { ApiProperty } from '@nestjs/swagger';

export class NotFound {
    @ApiProperty({ example: 404 })
    readonly statusCode: number;

    @ApiProperty({ example: 'Not Found.' })
    readonly message: string;
}
