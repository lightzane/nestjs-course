import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

/**
 * This guards are executed after a middleware
 * Used to protect certain endpoints
 */
@Injectable()
export class LightzaneAuthenticationGuard implements CanActivate {
    //
    // NOTE:
    // this guard has been replaced by the jwt auth guard!

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const host = context.switchToHttp();
        const req = host.getRequest<Request>();

        const user = req['user']; // see src/middleware

        // anonymous user
        if (!user) {
            // prevent access
            console.log(
                'console-lightzane guard: freeze! (authentication.guard.ts)',
            );
            throw new UnauthorizedException(
                'Lightzane Guard: FREEZE! Not authorized! (authentication.guard.ts)',
            );
        }

        // authenticated user
        console.log(
            'console-lighzane: you are authenticated, allowing access.. (authentication.guard.ts)',
        );

        return true;
    }
}
