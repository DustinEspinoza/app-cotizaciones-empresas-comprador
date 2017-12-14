import { Component } from '@angular/core';
import { NavbarLoginComponent } from './navbar-login.component';
import { FormLoginComponent } from './form-login.component';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { UserPost } from '../model/user-post';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'profile',
    templateUrl: '../view/profile.component.html'
})

export class ProfileComponent {
    isLogged: boolean;
    usrLogin: UserPost = new UserPost();
    formEmpresa: FormGroup;
    formUsuario: FormGroup;
    constructor(private router: Router, private persistence: PersistenceService, fb: FormBuilder, title: Title, meta: Meta) {
        this.formEmpresa = fb.group({
            'company_name': '',
            'legalIdentifier': '',
            'sellerID': '',
            'createdDate': '',
            'phone': '',
            'address': ''
        });
        this.formUsuario = fb.group({
            'userID': '',
            'username': '',
            'email': '',
            'phone_number': '',
            'createdDate': '',
            'role': ''
        });
        title.setTitle('Pefil - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Perfil del comprador para la app comprador de Cotizame' }
        ]);
    }
    ngOnInit() {
        this.usrLogin = this.persistence.get('postUser', StorageType.SESSION);
        this.formUsuario.controls['userID'].setValue(this.usrLogin.userID);
        this.formUsuario.controls['username'].setValue(this.usrLogin.username);
        this.formUsuario.controls['email'].setValue(this.usrLogin.email);
        this.formUsuario.controls['phone_number'].setValue(this.usrLogin.phone_number);
        this.formUsuario.controls['createdDate'].setValue(this.usrLogin.createdDate);
        this.formUsuario.controls['role'].setValue(this.usrLogin.role.name);

        this.formEmpresa.controls['company_name'].setValue(this.usrLogin.company.name);
        this.formEmpresa.controls['legalIdentifier'].setValue(this.usrLogin.company.legalIdentifier);
        this.formEmpresa.controls['sellerID'].setValue(this.usrLogin.company.customerID);
        this.formEmpresa.controls['createdDate'].setValue(this.usrLogin.company.createdDate);
        this.formEmpresa.controls['phone'].setValue(this.usrLogin.company.phone);
        this.formEmpresa.controls['address'].setValue(this.usrLogin.company.address);
    }
}