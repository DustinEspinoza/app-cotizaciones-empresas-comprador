import { Component } from '@angular/core';
import { NavbarLoginComponent } from './navbar-login.component';
import { FormLoginComponent } from './form-login.component';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';

@Component({
    selector: 'login',
    templateUrl: '../view/login.component.html'
})

export class LoginComponent {
    isLogged: boolean;
    constructor(private router: Router, private persistence: PersistenceService) { }
    ngOnInit() {
        this.isLogged = this.persistence.get('isLogged', StorageType.SESSION);
        if (this.isLogged) {
            this.router.navigate(['/user']);
        }
    }
}