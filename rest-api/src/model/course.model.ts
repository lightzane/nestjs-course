import { ApiProperty } from '@nestjs/swagger';
import { prop } from '@typegoose/typegoose';
import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsMongoId,
    IsString,
} from 'class-validator';

export class Course {
    @IsMongoId()
    _id: string;

    @IsInt({
        message: 'seqNo must be a numeric - course.model.ts (class-validator)',
    })
    @prop()
    seqNo: number;

    @prop()
    url: string;

    @prop()
    iconUrl: string;

    @prop()
    courseListIcon: string;

    @prop()
    @ApiProperty({ type: String, description: 'The title of the course' })
    description: string;

    @prop()
    @ApiProperty({ type: String, description: 'This is the main description.' })
    longDescription: string;

    @prop()
    @ApiProperty({ type: String, description: 'category' })
    category: string;

    @prop()
    lessonsCount: number;

    @IsBoolean({
        message: 'boolean dapat ito - course.model.ts (class-validator)',
    })
    @prop()
    @ApiProperty({
        type: Boolean,
        description: 'Identify if the course is in promo.',
        default: false,
    })
    promo: boolean;
}
