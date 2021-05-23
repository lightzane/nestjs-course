import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router: Router,
        private snackbar: MatSnackBar,
    ) {
        this.form = fb.group({
            email: ['student@angular-university.io', [Validators.required]],
            password: ['password', [Validators.required]],
        });
    }

    ngOnInit() {}

    login() {
        const val = this.form.value;

        this.auth.login(val.email, val.password).subscribe(
            () => {
                // see rest-api/src/auth/auth.service.ts

                localStorage.setItem('login', '');
                this.router
                    .navigateByUrl('/courses')
                    // (Optional) reload page to apply the this.login and reflect the changes in the ui
                    .then(() => window.location.reload());

                /** DEPRECATED
                 * Next: Attach the token on every HTTP request made by the client
                 * How? See app.module.ts (Interceptors)
                 */

                /**
                 * Use cookies
                 * see rest-api/src/auth/auth.service.ts
                 */
            },
            (err) => {
                console.log('login failed', err);
                let err$ = err.error.errorMessage.message || err.message;
                alert(`${err$}`);
                this.snackbar.open(err$, null, { duration: 3000 });
                // see also src/app/courses/services/courses-http.service.ts deleteCourse()
                // for other ways of displaying snackbar
            },
        );
    }
}
