import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { Lesson } from 'src/model/lesson.model';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
    imports: [TypegooseModule.forFeature([Lesson])],
    controllers: [LessonsController],
    providers: [LessonsService],
})
export class LessonsModule {}
