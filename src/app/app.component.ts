import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    constructor(private router: Router, private auth: AuthService) {}

    login: boolean = false;

    ngOnInit() {
        // let user = localStorage.getItem('authJwtToken');
        let login = localStorage.getItem('login');
        // if (login != undefined) this.login = true;
        // else this.login = false; // (Optional) added as indicator to remove login button if already logged in and vice-versa
    }

    logout() {
        this.auth.logout().subscribe();
        // localStorage.removeItem('authJwtToken');
        localStorage.removeItem('login');
        this.router
            .navigateByUrl('/login')
            // (Optional) reload page to apply the this.login and reflect the changes in the ui
            .then(() => window.location.reload());
    }
}
