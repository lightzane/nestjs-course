import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class LightzaneFallbackExceptionFilter implements ExceptionFilter {
    /**
     * to simulate error
     * add a validtor in src/courses/course.model.ts
     * e.g. required "seqNo"
     * then send a POST request without "seqNo"
     */

    catch(exception: any, host: ArgumentsHost) {
        console.log('Lightzane sees your error', JSON.stringify(exception));

        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        return res.status(500).json({
            lightzane: true,
            createdBy: 'Lightzane - FallbackExceptionFilter',
            status: res.statusCode,
            errorMessage: exception.message
                ? exception.message
                : 'Lightzane - Unexpected error occured',
        });
    }
}
