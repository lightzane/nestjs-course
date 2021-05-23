import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { User } from 'src/model/user.model';

// import * as passwordHashAndSalt from 'password-hash-and-salt';
// import * as jwt from 'jsonwebtoken';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private readonly userModel: ReturnModelType<typeof User>,
        private readonly jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        console.log('hacker: psst, the password is ' + password);
        let user = await this.userModel.findOne({ email });

        // ## VALIDATE USER
        if (!user) {
            console.log('user does not exist');
            throw new UnauthorizedException('Lightzane: Di kita kilala!');
        }

        // ## VALIDATE PASSWORD

        try {
            if (await argon2.verify(user.passwordHash, password)) {
                // authenticated
                const authJwtToken = this.jwtService.sign({
                    email,
                    roles: user.roles,
                });
                return { authJwtToken };
            } else {
                throw new UnauthorizedException(
                    'Lightzane: [x] INVALID password',
                );
            }
        } catch (err) {
            console.log(err);
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
