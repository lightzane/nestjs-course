import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/model/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        TypegooseModule.forFeature([User]),
        // this can't read process.env yet (use async instead)
        // JwtModule.register({
        //     secret: process.env.JWT_SECRET_KEY,
        //     signOptions: {
        //         expiresIn: '3m',
        //     },
        // }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET_KEY'),
                signOptions: {
                    expiresIn: '3m',
                },
                // what is the parenthesis "({})"
                // -- it is a shorthand for one-line code sytax to return an object
                //
                // (m) => m.data
                // this is a shorthand for (m) => { return m.data }
                //
                // (m) => ({ m.data, m.moreDate }),
                // this is a shorthand for
                //
                // (m) => {
                //    return {
                //       m.data,
                //       m.moreData
                //    }
                // }
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
