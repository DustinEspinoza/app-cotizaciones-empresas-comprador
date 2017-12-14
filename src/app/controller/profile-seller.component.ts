import { Component } from '@angular/core';
import { FormLoginComponent } from './form-login.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { CompanyGet } from '../model/company-get';
import { ProductGet } from '../model/products-get';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'profile-seller',
    templateUrl: '../view/profile-seller.component.html'
})

export class ProfileSellerComponent {
    companyget: CompanyGet;
    public products: ProductGet[] = new Array<ProductGet>();
    public path: string;
    constructor(private router: Router, private persistence: PersistenceService, private http: HttpClient, title: Title, meta: Meta) {
        title.setTitle('Perfil Vendedor - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Perfil del vendedor para la app comprador de Cotizame' }
        ]);
    }
    ngOnInit() {
        this.companyget = this.persistence.get('IDSeller', StorageType.SESSION);
        if (this.companyget == null || this.companyget == undefined){
            this.router.navigate(['user/search']);
        }
        console.log(this.companyget);
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/sellers/" + this.companyget.sellerID + "/products";
        this.http.get<ProductGet[]>(this.path)
            .subscribe(
            data => {
                this.products = data;
            },
            err => {

            }
            )

    }
    cotizar() {
        this.router.navigate(['/user/search/seller/quote']);
    }
}