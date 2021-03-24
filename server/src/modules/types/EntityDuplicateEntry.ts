import { ApiProperty } from '@nestjs/swagger';

export class EntityDuplicateEntry {
    @ApiProperty({ example: 409 })
    readonly statusCode: number;

    @ApiProperty()
    readonly message: [];

    @ApiProperty({ example: 'Entity already exists' })
    readonly error: string;
}