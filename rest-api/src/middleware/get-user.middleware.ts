import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express'; // not generated from nest schematics
// import * as jwt from 'jsonwebtoken';

/**
 * this middleware is used to decode the token for authentication
 * Client --> [Middleware] --> Route handlers (GET, POST, etc)
 */

@Injectable()
export class LightzaneGetUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        // const authJwtToken = req.headers.authorization;
        const authJwtToken = req.cookies['accessToken'];
        // see src/auth.service.ts for the creation of cookies

        if (!authJwtToken) {
            next(); // allow the request to go through
            return;
        }

        this.logger.log('I am the middleware');
        req.headers.authorization = `Bearer ${authJwtToken}`;
        next();

        // for jsonwebtoken (npm)
        // if authenticated
        // try {
        //     // put this in environment variables next time!
        //     let ENV_JWTSECRET = process.env.JWT_SECRET_KEY;

        //     // returns the payload which is user profile
        //     const user = jwt.verify(authJwtToken, ENV_JWTSECRET);

        //     if (user) {
        //         console.log('Found user details in JWT', user);
        //         req['user'] = user; // will be accessed by the guard, see src/guards
        //     }
        // } catch (err) {
        //     console.log('Lightzane: Err handling authentication in JWT', err);
        // }

        // next();
    }

    private readonly logger = new Logger('Middleware', true);
}
