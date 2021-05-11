import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException as BaseNotFoundException, HttpStatus,
} from '@nestjs/common';
import { ERROR_MESSAGES } from '../constants/common.constants';

@Catch(BaseNotFoundException)
export class NotFoundException implements ExceptionFilter {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: BaseNotFoundException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const message = { statusCode: HttpStatus.NOT_FOUND, message: ERROR_MESSAGES.NOT_FOUND };

        response.status(HttpStatus.NOT_FOUND).send(message);
    }
}
