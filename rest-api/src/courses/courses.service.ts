import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
import { InjectModel } from 'nestjs-typegoose';
// import { Model } from 'mongoose';
// import { Course } from './model/courses.schema';
import { Course } from '../model/course.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class CoursesService {
    constructor(
        // @InjectModel('Course') private readonly courseModel: Model<Course>,
        @InjectModel(Course)
        private readonly courseModel: ReturnModelType<typeof Course>,
    ) {}

    async addCourse(course) {
        // this.courseModel.create(course)

        // opportunity to show a different way
        const newCourse = new this.courseModel(course);
        await newCourse.save();

        return newCourse.toObject({
            // sends back to front-end without the generated mongoose specific properties
            versionKey: false,
        });
    }

    async findAll(): Promise<Course[]> {
        return this.courseModel.find();
    }

    async findCourseByUrl(url: string) {
        return this.courseModel.findOne({ url });
    }

    async updateCourse(courseId: string, changes: Course): Promise<Course> {
        return this.courseModel.findOneAndUpdate({ _id: courseId }, changes, {
            new: true,
        });
    }

    async deleteCourse(courseId: string) {
        return this.courseModel.deleteOne({ _id: courseId });
    }
}
