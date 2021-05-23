import { Catch } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
// import { LightzaneValidationException } from './validation.exception';

// @Catch(LightzaneValidationException)
@Catch(BadRequestException)
export class LightzaneValidationExceptionFilter implements ExceptionFilter {
    // catch(exception: LightzaneValidationException, host: ArgumentsHost) {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();

        return res.status(400).json({
            lightzane: true,
            statusCode: 400,
            createdBy: 'LightzaneValidationExceptionFilter',
            // errors: exception.errMessage
            errors: exception.message,
        });
    }
}
