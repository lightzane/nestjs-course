import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class LightzaneHttpExceptionFilter implements ExceptionFilter {
    // https://docs.nestjs.com/exception-filters#exception-filters-1
    /**
     * You may want full control over the exceptions layer.
     * For example, you may want to add logging or use a different
     * JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.
     */

    // to simulate error
    // see comments in src/courses/courses.controller.ts

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();

        return res.status(status).json({
            lightzane: true,
            createdBy: 'Lightzane - HttpExecptionFilter',
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: req.url,
            errorMessage: exception.message,
        });
    }
}
