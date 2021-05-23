import { BadRequestException } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';

@Controller('lessons')
@ApiTags('lessons')
export class LessonsController {
    constructor(private readonly lessonService: LessonsService) {}

    @Get()
    // already returning a promise so need to make this 'async'
    searchLesson(
        @Query('courseId') courseId: string,
        @Query('sortOrder') sortOrder = 'asc',
        @Query('pageNumber', ParseIntPipe) pageNumber = 0,
        @Query('pageSize', ParseIntPipe) pageSize = 3,
    ) {
        if (!courseId) {
            throw new BadRequestException(
                'Lightzane: courseId must not be defined',
            );
        }

        if (sortOrder != 'asc' && sortOrder != 'desc') {
            throw new BadRequestException(
                'Lightzane: sortOrder must be asc or desc',
            );
        }

        // return a promise
        return this.lessonService.search(
            courseId,
            sortOrder,
            pageNumber,
            pageSize,
        );
    }
}
