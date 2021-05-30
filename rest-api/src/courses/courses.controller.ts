import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    BadRequestException,
    // HttpException,
    // UseFilters,
    NotFoundException,
    UseGuards,
} from '@nestjs/common';
// import { LightzaneHttpExceptionFilter } from 'src/filters/http-execption.filter';
// import { ToIntegerPipe } from 'src/pipes/to-integer.pipe';
import { CoursesService } from './courses.service';
import { Course } from '../model/course.model';
import { LightzaneAuthenticationGuard } from 'src/guards/authentication.guard';
import { LighzaneAdminGuard } from 'src/guards/admin.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('courses')
// @UseFilters(new LightzaneHttpExceptionFilter())
/**
 * uncomment above line to apply filter to all requests handled under the controller
 * or --
 * for GLOBAL usage, apply it to the main.ts
 *  */
// @UseGuards(LightzaneAuthenticationGuard)
@UseGuards(JwtAuthGuard)
@ApiTags('courses')
export class CoursesController {
    constructor(private readonly coursesService: CoursesService) {}

    @Post()
    @UseGuards(LighzaneAdminGuard)
    @ApiBody({ type: Course })
    @ApiBearerAuth()
    async createCourse(@Body() course: Course): Promise<Course> {
        console.log('creating new course...');
        return this.coursesService.addCourse(course);
    }

    @Get()
    // @UseGuards(LightzaneAuthGuard)
    async findAllCourses(): Promise<any> {
        return this.coursesService.findAll();
    }

    @Get(':courseUrl')
    async findCourseByUrl(@Param('courseUrl') url: string): Promise<any> {
        console.log('finding course by url', url);

        const course = await this.coursesService.findCourseByUrl(url);

        if (!course) {
            throw new NotFoundException(
                'Lightzane: Could not find course for url' + url,
            );
        }

        return course;
    }

    @Put(':courseId')
    @UseGuards(LighzaneAdminGuard)
    // @UseFilters(new LightzaneHttpExceptionFilter())
    async updateCourse(
        @Param('courseId') courseId: string,
        // @Body('seqNo', ToIntegerPipe) seqNo: string, // the message from pipe will get displayed instead of that from the filter fallback-exception
        @Body() changes: Course,
    ) {
        console.log('updating course...');

        // to simulate error,
        // go to edit-course-dialog.component.ts
        if (changes._id) {
            // throw new HttpException('Cannot update course id ', 400)

            // more readable
            throw new BadRequestException('Cannot update course id');
        }

        return this.coursesService.updateCourse(courseId, changes);
    }

    @Delete(':courseId')
    @UseGuards(LighzaneAdminGuard)
    async deleteCourse(@Param('courseId') courseId: string) {
        return this.coursesService.deleteCourse(courseId);
    }
}
