import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/model/user.model';

// import * as passwordHashAndSalt from 'password-hash-and-salt';
// import * as jwt from 'jsonwebtoken';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private readonly userModel: ReturnModelType<typeof User>,
        private readonly jwtService: JwtService,
    ) {
        this.logger.log({
            message: 'I got initialized',
            timestampt: new Date().toISOString,
        });
    }

    private readonly logger = new Logger('AuthService', true);

    async login(email: string, password: string, res: Response) {
        let hacker = 'hacker: psst, the password is ' + password;
        this.logger.error(hacker, hacker);

        let user = await this.userModel.findOne({ email });

        // ## VALIDATE USER
        if (!user) {
            this.logger.warn('user does not exist');
            throw new UnauthorizedException('Lightzane: Di kita kilala!');
        }

        // ## VALIDATE PASSWORD
        try {
            this.logger.debug('Validating password');
            if (await argon2.verify(user.passwordHash, password)) {
                // authenticated
                const authJwtToken = this.jwtService.sign({
                    email,
                    roles: user.roles,
                });
                res.cookie('accessToken', authJwtToken, {
                    httpOnly: true,
                    expires: new Date(new Date().getTime() + 30 * 1000), // expires 30s from now
                    sameSite: true,
                    secure: true,
                });

                // you can return anything you want
                return res.json();
            } else {
                throw new UnauthorizedException(
                    // this will be caught by the "catch()" since this is inside the try {}
                    'Lightzane: [x] INVALID password',
                );
            }
        } catch (err) {
            this.logger.error(err.response.message, err);
            // from the 'else' at line 59
            throw new UnauthorizedException(err.response.message);
        }

        // npm i password-hash-and-salt
        // this library is has a callback that is not easily converted to a promise-based API
        // so create our own Promise
        // return new Promise((resolve, reject) => {
        //     passwordHashAndSalt(password).verifyAgainst(
        //         user.passwordHash,
        //         (err, verified) => {
        //             if (!verified) {
        //                 reject(
        //                     new UnauthorizedException(
        //                         'Lightzane: Invalid password ka!',
        //                     ),
        //                 );
        //             }

        //             // put this in environment variables next time!
        //             let ENV_JWTSECRET = process.env.JWT_SECRET_KEY;

        //             const authJwtToken = jwt.sign(
        //                 {
        //                     email,
        //                     roles: user.roles,
        //                 },
        //                 ENV_JWTSECRET,
        //                 { expiresIn: '15m' },
        //             );

        //             // return to client
        //             resolve({ authJwtToken });
        //         },
        //     );
        // });
    }
}
