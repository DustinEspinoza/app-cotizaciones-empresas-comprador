import { Component } from '@angular/core';
import { PersistenceService, StorageType } from 'angular-persistence';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { QuotationsSummary } from '../model/quotations-summary';
import { UserPost } from '../model/user-post';
import { QuotationStatus } from '../model/quotation-status';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'quotations-6',
    templateUrl: '../view/quotations.component.html'
})

export class QuotationsComponent6 {
    public quote: QuotationsSummary = new QuotationsSummary();
    public path: string;
    public usrLogin: UserPost = new UserPost();
    public hayCotizaciones: boolean = false;
    public quotesByStatu: QuotationStatus[] = new Array<QuotationStatus>();
    public qStatus: QuotationStatus = new QuotationStatus();
    constructor(private http: HttpClient, private persistence: PersistenceService, private router: Router, title: Title, meta: Meta) {
        title.setTitle('Cotizaciones Completadas - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Cotizaciones completadas del comprador para la app comprador de Cotizame' }
        ]);
    }
    ngOnInit() {
        this.usrLogin = this.persistence.get('postUser', StorageType.SESSION);
        this.quote = this.persistence.get('quoteID', StorageType.SESSION);
        console.log(this.quote.statusID);
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/customers/" + this.usrLogin.company.customerID + "/quotations?statusID=" + this.quote.statusID;
        this.http.get<QuotationStatus[]>(this.path)
            .subscribe(
            data => {
                this.quotesByStatu = data;
                console.log(this.quotesByStatu);
                if (this.quotesByStatu.length > 0) {
                    this.hayCotizaciones = true;
                }
            },
            err => {

            }
            );
    }
    verDetalle(ID: any) {
        this.qStatus = ID;
        this.persistence.set('quotationByStatus', ID, { type: StorageType.SESSION });
        this.router.navigate(['/user/quotation/detail']);
    }
}