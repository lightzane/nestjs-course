import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { Lesson } from '../model/lesson.model';

@Injectable()
export class LessonsService {
    constructor(
        @InjectModel(Lesson)
        private readonly lessonModel: ReturnModelType<typeof Lesson>,
    ) {}

    search(
        courseId: string,
        sortOrder: string,
        pageNumber: number,
        pageSize: number,
    ) {
        console.log(
            'searching for lessons',
            courseId,
            sortOrder,
            pageNumber,
            pageSize,
        );

        return this.lessonModel.find(
            { course: courseId },
            // what fields to return? (null - to display all fields)
            null,
            // set cursors
            {
                skip: pageNumber * pageSize,
                limit: pageSize, // see src/courses/course/course.component.ts "add pageSize parameter"
                sort: {
                    seqNo: sortOrder,
                },
            },
        );
    }
}
