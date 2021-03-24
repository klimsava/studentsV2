import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponse {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    message: string;
}
