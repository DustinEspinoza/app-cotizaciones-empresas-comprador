import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { ContentJSON} from '../model/content-json';
import { QuotationStatus } from '../model/quotation-status';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'quotation-1-detail',
    templateUrl: '../view/quotation-detail.component.html'
})

export class QuotationDetailComponent {
    isLogged: boolean;
    public contents: ContentJSON[] = new Array<ContentJSON>();
    public quote: QuotationStatus = new QuotationStatus();
    public isCategory1or3 = false;
    public showAnswerForm = false;
    public path: string;
    public formAnswer: FormGroup;
    public newContent: ContentJSON = new ContentJSON();
    public contentsSend: ContentJSON[] = new Array<ContentJSON>();
    constructor(private router: Router, private persistence: PersistenceService, private http: HttpClient, fb: FormBuilder) {
        this.formAnswer = fb.group({
            'public_name': '',
            'quantity': ''
        });
    }
    ngOnInit() {
        this.quote = this.persistence.get('quotationByStatus', StorageType.SESSION);
        let json = JSON.parse(this.quote.content);
        this.contents = <ContentJSON[]>json;
        if (this.quote.status.statusID == 1 || this.quote.status.statusID == 3) {
            this.isCategory1or3 = true;
        }
        console.log(this.contents);
    }
    marcarLeida() {
        console.log(this.quote.quotationID);
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/quotations/" + this.quote.quotationID + "/reading";
        this.http.put(
            this.path,
            {},
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                responseType: 'text'
            }
        ).subscribe(
            data => {
                console.log(data);
                this.router.navigateByUrl('/user/profile').then(
                    () => {
                        this.router.navigateByUrl('/user/dashboard');
                    });
            }
            );
    }
    aceptar() {
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/quotations/" + this.quote.quotationID + "/answers";
        this.http.post(this.path, {
            updatedStatusID: 5,
            content: ''
        }).subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/user/dashboard']);
            },
            err => {

            }
            );
    }
    contestar() {
        this.showAnswerForm = true;
    }
    agregarProducto() {
        this.newContent = new ContentJSON();
        this.newContent.public_name = this.formAnswer.controls['public_name'].value;
        this.newContent.quantity = this.formAnswer.controls['quantity'].value;
        this.contentsSend.push(this.newContent);
    }
    cancelar() {
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/quotations/" + this.quote.quotationID + "/answers";
        this.http.post(this.path, {
            updatedStatusID: 4,
            content: ''
        }).subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/user/dashboard']);
            },
            err => {

            }
            );
    }
    send(form: any) {
        this.newContent.public_name = this.formAnswer.controls['public_name'].value;
        this.newContent.quantity = 0;
        this.contentsSend.push(this.newContent);
            this.path = "https://cotizame-api.azurewebsites.net/api/v1/quotations/" + this.quote.quotationID + "/answers";
            this.http.post(this.path, {
                updatedStatusID: 3,
                content: JSON.stringify(this.contentsSend)
            }).subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['/user/dashboard']);
                },
                err => {

                }
                );
            
    }
    
}