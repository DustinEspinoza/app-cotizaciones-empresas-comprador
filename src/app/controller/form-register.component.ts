import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { UserRegister } from '../model/user-register';
import { ContactRegister } from '../model/contact-register';
import { toast } from 'angular2-materialize';

declare var $: any;

@Component({
    selector: 'form-register',
    templateUrl: '../view/form-register.component.html'
})

export class FormRegisterComponent {
    myForm: FormGroup;

    constructor(private router: Router, fb: FormBuilder, private http: HttpClient) {
        this.myForm = fb.group({
            'company_name': '',
            'company_legal_identifier': '',
            'address': '',
            'phone': '',
            'first_name': '',
            'middle_name': '',
            'first_surname': '',
            'second_surname': '',
            'email': '',
            'contact_phone': '',
            'username': '',
            'password':''
        });
    }
    limpiar() {
        this.myForm.reset();
    }

    registerUser(form: any): void {
        console.log("ingresaste: ", form);
        $('#modal').modal('open');
        let register: UserRegister = new UserRegister();
        let contact: ContactRegister = new ContactRegister();
        register.companyName = this.myForm.controls['company_name'].value;
        register.companyLegalIdentifier = this.myForm.controls['company_legal_identifier'].value;
        register.address = this.myForm.controls['address'].value;
        register.phone = this.myForm.controls['phone'].value;
        contact.firstName = this.myForm.controls['first_name'].value;
        contact.middleName = this.myForm.controls['middle_name'].value;
        contact.firstSurName = this.myForm.controls['first_surname'].value;
        contact.secondSurName = this.myForm.controls['second_surname'].value;
        contact.email = this.myForm.controls['email'].value;
        contact.contactPhone = this.myForm.controls['contact_phone'].value;
        contact.username = this.myForm.controls['username'].value;
        contact.password = this.myForm.controls['password'].value;
        register.contact = contact;

        this.http.post("https://cotizame-api.azurewebsites.net/api/v1/customer-registrations",
            {
                companyName: register.companyName,
                companyLegalIdentifier: register.companyLegalIdentifier,
                address: register.address,
                phone: register.phone,
                contact: {
                    firstName: register.contact.firstName,
                    middleName: register.contact.middleName,
                    firstSurName: register.contact.firstSurName,
                    secondSurName: register.contact.secondSurName,
                    email: register.contact.email,
                    contactPhone: register.contact.contactPhone,
                    username: register.contact.username,
                    password: register.contact.password
                }
            },
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .subscribe(
            (data: any) => {
                console.log(data);
                this.limpiar();
                $('#modal').modal('close');
                toast("Registro completo, espere su aprobaciom", 4000);
            }
        )
    }
}