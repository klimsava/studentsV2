import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    NotFoundException as BaseNotFoundException,
} from '@nestjs/common';

@Catch(BaseNotFoundException)
export class NotFoundException implements ExceptionFilter {
    catch(exception: BaseNotFoundException, host: ArgumentsHost) {
        const response = host.switchToHttp().getResponse();
        const message = { statusCode: 404, message: 'Not Found' };

        response.status(404).send(message);
    }
}
