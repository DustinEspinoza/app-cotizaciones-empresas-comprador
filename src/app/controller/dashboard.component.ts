import { Component } from '@angular/core';
import { tiposCotizaciones } from '../model/tipos-cotizaciones';
import { UserPost } from '../model/user-post';
import { PersistenceService, StorageType } from 'angular-persistence';
import { QuotationsSummary } from '../model/quotations-summary';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'dashboard',
    templateUrl: '../view/dashboard.component.html'
})

export class DashboardComponent {
    usrLogin: UserPost;
    constructor(private service: PersistenceService, private http: HttpClient, private router: Router, title: Title, meta: Meta) {
        title.setTitle('Dashboard - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Dashboard para la app comprador de Cotizame' }
        ]);
    }
    public path: string;
    public quotes: QuotationsSummary[] = new Array<QuotationsSummary>();
    public q: QuotationsSummary = new QuotationsSummary();

    ngOnInit() {
        this.usrLogin = this.service.get('postUser', StorageType.SESSION);
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/customers/" + this.usrLogin.company.customerID + "/quotations/summary";
        this.http.get<QuotationsSummary[]>(this.path)
            .subscribe(
            data => {
                this.quotes = data;
            },
            err => {

            }
            );
    }
    goQuotes(ID: any): void {
        this.service.set('quoteID', ID, { type: StorageType.SESSION });
        this.q = ID;
        this.router.navigate(['/user/quotations-' + this.q.statusID]);
    }
}