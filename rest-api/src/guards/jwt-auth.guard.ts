import { Logger } from '@nestjs/common';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
// export class JwtAuthGuard implements CanActivate {
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // return true;
        this.logger.log('Guarding this entry point!');
        return super.canActivate(context);
    }

    private readonly logger = new Logger('JwtAuthGuard', true);

    // OPTIONAL (for customization)
    // this is executed after validate() in jwt.strategy.ts
    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        if (err || !user) {
            this.logger.error(err, err);
            throw err || new UnauthorizedException();
        } else {
            this.logger.debug('Handling request:');
            this.logger.log(user); // contains the payload from jwt
            this.logger.log(info);
        }
        return user;
    }
}
