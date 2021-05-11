import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../common/constants/common.constants';

export class EntityDuplicateType {
    @ApiProperty({ example: HttpStatus.CONFLICT })
    readonly statusCode: number;

    @ApiProperty()
    readonly message: [];

    @ApiProperty({ example: ERROR_MESSAGES.CONFLICT })
    readonly error: string;
}