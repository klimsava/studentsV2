import { ApiProperty } from '@nestjs/swagger';
import { ERROR_MESSAGES } from '../common/constants/common.constants';
import { HttpStatus } from '@nestjs/common';

export class BadRequestType {
    @ApiProperty({ example: HttpStatus.BAD_REQUEST })
    readonly statusCode: number;

    @ApiProperty()
    readonly message: [];

    @ApiProperty({ example: ERROR_MESSAGES.BAD_REQUEST })
    readonly error: string;
}
