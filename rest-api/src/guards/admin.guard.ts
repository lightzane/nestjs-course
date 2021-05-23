import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { LightzaneAuthorizationGuard } from './authorization.guard';

@Injectable()
export class LighzaneAdminGuard extends LightzaneAuthorizationGuard {
    constructor() {
        super(['ADMIN']);
    }
}
