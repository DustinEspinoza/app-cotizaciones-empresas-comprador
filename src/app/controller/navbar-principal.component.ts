import { Component } from '@angular/core';
import { UserPost } from '../model/user-post';
import { PersistenceService, StorageType } from 'angular-persistence';
import { tiposCotizaciones } from '../model/tipos-cotizaciones';
import { QuotationsSummary } from '../model/quotations-summary';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'navbar-principal',
    templateUrl: '../view/navbar-principal.component.html'
})

export class NavbarPrincipalComponent {
    usrLogin: UserPost = new UserPost();
    tipos: tiposCotizaciones[] = [];
    quotes: QuotationsSummary[] = new Array<QuotationsSummary>();
    q: QuotationsSummary = new QuotationsSummary();
    public path: string;
    constructor(private persistence: PersistenceService, private router: Router, private http: HttpClient) { }
    ngOnInit() {
        this.usrLogin = this.persistence.get('postUser', StorageType.SESSION);
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
        this.persistence.set('quoteID', ID, { type: StorageType.SESSION });
        this.q = ID;
        this.router.navigate(['/user/quotations-' + this.q.statusID]);
    }
    logout() {
        this.persistence.remove('postUser', StorageType.SESSION);
        this.persistence.remove('isLogged', StorageType.SESSION);
        this.router.navigate(['/login']);
    }
}