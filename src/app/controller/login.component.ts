import { Component } from '@angular/core';
import { NavbarLoginComponent } from './navbar-login.component';
import { FormLoginComponent } from './form-login.component';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'login',
    templateUrl: '../view/login.component.html'
})

export class LoginComponent {
    isLogged: boolean;
    constructor(private router: Router, private persistence: PersistenceService, title: Title, meta: Meta) {
        title.setTitle('Login - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Login para la app comprador de Cotizame' }
        ]);
    }
    ngOnInit() {
        this.isLogged = this.persistence.get('isLogged', StorageType.SESSION);
        if (this.isLogged) {
            this.router.navigate(['/user']);
        }
    }
}