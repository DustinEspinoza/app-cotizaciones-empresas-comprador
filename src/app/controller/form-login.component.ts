import { Component } from '@angular/core';
import { userLogin } from '../model/user-login';
import { UserPost } from '../model/user-post';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { PersistenceService, StorageType } from 'angular-persistence';

declare var $: any;

@Component({
    selector: 'form-login',
    templateUrl: '../view/form-login.component.html'
})

export class FormLoginComponent {
    myForm: FormGroup;

    constructor(private router: Router, fb: FormBuilder, private http: HttpClient, private persistence: PersistenceService) {
        this.myForm = fb.group({
            'company_id': '',
            'user': '',
            'password': ''
        });
    }
    id = 1;
    response = new UserPost();
    loginUser(form: any): void {
        $('#modal').modal('open');
        let user: userLogin = new userLogin(+this.myForm.controls['company_id'].value, this.myForm.controls['user'].value, this.myForm.controls['password'].value);
        var login: boolean = false;
        this.http.post<UserPost>("https://cotizame-api.azurewebsites.net/api/v1/authentication/customer-user",
            {
                companyCode: user.CompanyID,
                username: user.UserName,
                password: user.Password
            },
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .subscribe(
            (data: any) => {
                this.response = data;
                $('#modal').modal('close');
                this.persistence.set('postUser', this.response, { type: StorageType.SESSION });
                login = true;
                if (login) {
                    this.persistence.set('isLogged', login, { type: StorageType.SESSION });
                    this.router.navigate(['/user']);
                }
            }
            )
    }
}