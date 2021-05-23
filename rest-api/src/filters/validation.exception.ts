import { BadRequestException } from '@nestjs/common';

export class LightzaneValidationException extends BadRequestException {
    constructor(public errMessage: string[]) {
        super();
    }
}
