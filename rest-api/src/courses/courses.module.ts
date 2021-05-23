import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
// import { Course } from './schemas/courses.schema';
import { Course } from '../model/course.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
    imports: [
        // MongooseModule.forFeature([{ name: 'Course', schema: Course }]),
        TypegooseModule.forFeature([Course]),
        LessonsModule,
    ],
    controllers: [CoursesController],
    providers: [CoursesService],
})
export class CoursesModule {}
