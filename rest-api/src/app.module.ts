import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoursesModule } from './courses/courses.module';
// import { MongooseModule } from '@nestjs/mongoose'
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from './auth/auth.module';
import { LightzaneGetUserMiddleware } from './middleware/get-user.middleware';
import { CoursesController } from './courses/courses.controller';
import { LessonsController } from './lessons/lessons.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: './config/config.env',
            isGlobal: true,
        }),
        CoursesModule,
        // MongooseModule.forRoot('mongodb+srv://m001-student:xNwfLcqxBpTsWoWX@sandbox.hq1xl.mongodb.net/nestjs-course?retryWrites=true&w=majority')
        // TypegooseModule.forRoot(
        //     process.env.MONGO_CONNECTION,
        //     // to fix the deprecation warning
        //     { useNewUrlParser: true, useUnifiedTopology: true },
        // ),
        // Use this to better make use of the config.env file
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get('MONGO_CONNECTION'),
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            inject: [ConfigService],
        }),
        AuthModule,
    ],
})
export class AppModule implements NestModule {
    // add NestMedule after creating a middleware, see src/middleware
    // Client --> [ Middleware ] --> RouteHandlers (GET, POST, etc)
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LightzaneGetUserMiddleware)
            .forRoutes(CoursesController, LessonsController);
    }
}
