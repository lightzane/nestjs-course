import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LightzaneFallbackExceptionFilter } from './filters/fallback-exception.filter';
import { LightzaneHttpExceptionFilter } from './filters/http-execption.filter';

import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { ToIntegerPipe } from './pipes/to-integer.pipe';
import { ValidationError } from 'class-validator';
import { LightzaneValidationExceptionFilter } from './filters/validation-exception.filter';
import { LightzaneValidationException } from './filters/validation.exception';
mongoose.set('useFindAndModify', false); // fixes the deprecation warning for findOneAndUpdate() etc.

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.setGlobalPrefix('api');

    app.useGlobalFilters(
        // the order is important!
        // general --> specific
        new LightzaneFallbackExceptionFilter(), // handles errors
        new LightzaneHttpExceptionFilter(),
        new LightzaneValidationExceptionFilter(),
    );

    // to be able to use class-validator in your models at src/schemas/course.model.ts
    // then the error messages are handled by the filters to return to frontend
    app.useGlobalPipes(
        new ValidationPipe({
            skipMissingProperties: true,

            // custom validations (uncomment this to get the plain ValidationPipe repsonse)
            exceptionFactory: (errors: ValidationError[]) => {
                const messages = errors.map(
                    error =>
                        `(${error.property} has wrong value ${
                            error.value
                        }): ${Object.values(error.constraints).join(', ')}`,
                );

                // return new LightzaneValidationException(messages);
                return new BadRequestException(messages);
            },
        }),
    );

    const options = new DocumentBuilder()
        .setTitle('My NestJs Course API')
        .setDescription('(Sample only) This is my description for my API :-)')
        .setVersion('1.0')
        // .addBearerAuth(
        //     {
        //         type: 'http',
        //         scheme: 'bearer',
        //         bearerFormat: 'Token',
        //     },
        //     'authJwtToken',
        // )
        .addBasicAuth()
        .addTag('auth') // organizes the section in sequence
        .addTag('lessons') // remove all these .addTag() if you want it random sequence
        .addTag('courses') // see @ApiTags() in the controllers
        .build();

    const document = SwaggerModule.createDocument(app, options, {
        // ignoreGlobalPrefix: true, // removes the redundancy of "/api" in swagger
    });
    SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'API | NestJs Course',
        // customCss: '',
        // customCssUrl: '',
    });

    await app.listen(process.env.PORT || 3000);
}

bootstrap();
