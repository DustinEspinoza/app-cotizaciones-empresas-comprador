import { Component } from '@angular/core';
import { FormLoginComponent } from './form-login.component';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { CompanyGet } from '../model/company-get';
import { ProductGet } from '../model/products-get';
import { UserPost } from '../model/user-post';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QuotePost } from '../model/quote-post';
import { toast } from 'angular2-materialize';
import { ContentJSON } from '../model/content-json';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'send-quote',
    templateUrl: '../view/send-quote.component.html'
})

export class SendQuoteComponent {
    companyget: CompanyGet;
    usrLogin: UserPost
    public products: ProductGet[] = new Array<ProductGet>();
    public path: string;
    formQuote: FormGroup;
    allProducts: ContentJSON[] = new Array<ContentJSON>();
    productLocal: ContentJSON = new ContentJSON();
    public quote: QuotePost = new QuotePost();
    constructor(private router: Router, private persistence: PersistenceService, private http: HttpClient, fb: FormBuilder, title: Title, meta: Meta) {
        this.formQuote = fb.group({
            'quote_name': '',
            'product_name': '',
            'quantity': '',
            'description': ''
        });
        title.setTitle('Envio cotizacion - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Envio de cotizaciones al vendedor para la app comprador de Cotizame' }
        ]);
    }
    ngOnInit() {
        this.companyget = this.persistence.get('IDSeller', StorageType.SESSION);
        this.usrLogin = this.persistence.get('postUser', StorageType.SESSION);
        if (this.companyget == null || this.companyget == undefined) {
            this.router.navigate(['user/search']);
        }
    }
    addProduct() {
        this.productLocal = new ContentJSON();
        this.productLocal.public_name = this.formQuote.controls['product_name'].value;
        this.productLocal.quantity = this.formQuote.controls['quantity'].value;
        this.allProducts.push(this.productLocal);
    }
    enviarCotizacion() {
        this.quote.customerID = this.usrLogin.company.customerID;
        this.quote.sellerID = this.companyget.sellerID;
        this.quote.title = this.formQuote.controls['quote_name'].value;
        this.quote.description = this.formQuote.controls['description'].value;
        this.quote.statusID = 1;
        this.http.post<UserPost>("https://cotizame-api.azurewebsites.net/api/v1/quotations",
            {
                title: this.quote.title,
                description: this.quote.description,
                content: JSON.stringify(this.allProducts),
                customerID: this.quote.customerID,
                sellerID: this.quote.sellerID,
                statusID: this.quote.statusID
            },
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .subscribe(
            (data: any) => {
                console.log(data);
                this.formQuote.controls['quote_name'].setValue('');
                this.formQuote.controls['product_name'].setValue('');
                this.formQuote.controls['quantity'].setValue('');
                this.formQuote.controls['description'].setValue('');
                toast("Cotizacion enviada al vendedor", 4000);
                this.router.navigate(['/user/search/seller/profile']);
            }
            )
    }
}