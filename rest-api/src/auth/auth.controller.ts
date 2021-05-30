import { Body, Controller, Logger, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

import {
    ApiBody,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
    constructor(private readonly auth: AuthService) {}

    private readonly logger = new Logger('AuthController', true);

    @Post('logout')
    @ApiResponse({
        status: 200,
        description: 'Simple logout',
    })
    logout(@Res() res: Response) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            sameSite: true,
            secure: true,
        });
        this.logger.debug('Someone is logging out...');
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
        return await this.auth.login(email, password, res);
    }
}
