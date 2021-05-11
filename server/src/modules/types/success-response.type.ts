import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseType {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    message: string;
}
