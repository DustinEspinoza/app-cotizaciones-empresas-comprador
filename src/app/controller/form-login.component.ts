import { Component } from '@angular/core';
import { userLogin } from '../model/user-login';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'form-login',
    templateUrl: '../view/form-login.component.html'
})

export class FormLoginComponent {
    myForm: FormGroup;

    constructor(private router: Router, fb: FormBuilder) {
        this.myForm = fb.group({
            'company_id': '',
            'user': '',
            'password': ''
        });
    }
    id = 1;

    loginUser(form: any): void {
        console.log('ingresaste: ', form);
        let user: userLogin = new userLogin(+this.myForm.controls['company_id'].value, this.myForm.controls['user'].value, this.myForm.controls['password'].value);
        console.log(user.UserName);
        if (user.UserName == "admin" && user.Password == "admin") {
            console.log("estoy aqui");
            this.router.navigate(['/user']);
        }
    }
}