import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { NavigationEnd, Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        // const authJwtToken = localStorage.getItem('authJwtToken');
        // if (authJwtToken) {
        //     const cloned = req.clone({
        //         headers: req.headers.set('Authorization', `${authJwtToken}`),
        //     });
        //     return next.handle(cloned);
        // } else {
        //     // if not authorized
        //     this.router.navigateByUrl('');
        //     return next.handle(req);
        // }
        const login = localStorage.getItem('login');

        if (login != undefined) {
            return next.handle(req);
        } else {
            // not authorized
            // this.router.navigateByUrl('');
            return next.handle(req);
        }
    }
}
