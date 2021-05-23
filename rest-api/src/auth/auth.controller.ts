import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

import {
    ApiBody,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/model/user.model';

@Controller()
@ApiTags('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    @Post('logout')
    @ApiResponse({
        status: 200,
        description: 'Simple logout',
    })
    logout(@Res() res: Response) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: true,
        });
        console.log('logging out');
        return res.json();
    }

    @Post('login')
    @ApiResponse({
        status: 200,
        description: 'Simple login with username and password',
    })
    @ApiUnauthorizedResponse({
        description: 'Invalid credentials',
    })
    async login(
        @Res() res: Response,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        let token = await this.auth.login(email, password);

        if (token) {
            try {
                res.cookie('accessToken', token['authJwtToken'], {
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 30 * 1000), // expires 30s from now
                    sameSite: true,
                });

                return res.json(token);
            } catch (err) {
                throw err;
            }
        }
    }
}
