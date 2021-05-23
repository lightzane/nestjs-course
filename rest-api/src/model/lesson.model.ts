import { ApiProperty } from '@nestjs/swagger';
import { prop, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';

export class Lesson {
    @prop()
    description: string;

    @prop()
    duration: string;

    @prop()
    seqNo: number;

    // { type: Schema.Types.ObjectId, ref: 'Course' }
    @ApiProperty({ type: Course })
    @prop({ ref: () => Course })
    course: Ref<Course>;
}
