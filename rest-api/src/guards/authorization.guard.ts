import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LightzaneAuthorizationGuard implements CanActivate {
    constructor(private allowedRoles: string[]) {}

    private readonly logger = new Logger('AuthorizationGuard', true);

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const host = context.switchToHttp();
        const req = host.getRequest<Request>();
        const user = req['user'];

        const allowed = this.isAllowed(user['roles']);

        console.log('executing authorization.guard.ts');
        console.log('console-lighzane: checking isAllowed: ', allowed);

        if (!allowed) {
            console.log(
                'user is authenticated but not authorized, DENYING access...',
            );
            throw new ForbiddenException('Lightzane: FORBIDDEN ka!');
        }

        console.log('user has access, GRANTING acess...');
        return true;
    }

    isAllowed(userRoles: string[]) {
        console.log(
            'console-lightzane: comparing roles:',
            this.allowedRoles,
            userRoles,
        );

        let allowed = false;

        userRoles.forEach(role => {
            console.log(
                'console-lightzane: checking if role is allowed: ',
                role,
            );

            // check if role are included in the allowed roles
            if (!allowed && this.allowedRoles.includes(role)) {
                allowed = true;
            }
        });

        return allowed;
    }
}
