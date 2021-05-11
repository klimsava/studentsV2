import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { ERROR_MESSAGES } from '../common/constants/common.constants';

export class NotFound {
    @ApiProperty({ example: HttpStatus.NOT_FOUND })
    readonly statusCode: number;

    @ApiProperty({ example: ERROR_MESSAGES.NOT_FOUND })
    readonly message: string;
}
