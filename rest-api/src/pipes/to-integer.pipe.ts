import {
    ArgumentMetadata,
    BadRequestException,
    PipeTransform,
} from '@nestjs/common';

export class ToIntegerPipe implements PipeTransform<string> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value);

        if (isNaN(val)) {
            // see courses.controller.ts ()
            throw new BadRequestException(
                'lightzane -- cannot convert following string to a number: ' +
                    value,
            );
        }

        return val;
    }
}
