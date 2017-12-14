import { Component } from '@angular/core';
import { Category } from '../model/category';
import { Subcategory } from '../model/subcategory';
import { CompanyGet } from '../model/company-get';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PersistenceService, StorageType } from 'angular-persistence';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'serch',
    templateUrl: '../view/search.component.html'
})

export class SearchComponent {
    public path: string;
    public categories: Category[] = new Array<Category>();
    public subcategories: Subcategory[] = new Array<Subcategory>();
    public categoryDefault: Category = new Category();
    public subCategoryDefault: Subcategory = new Subcategory();
    public categoryBind: Category[] = new Array<Category>();
    public subCategoryBind: Subcategory[] = new Array<Subcategory>();
    public arrayCat: number[] = [];
    public arraySubCat: number[] = [];
    public companies: CompanyGet[] = new Array<CompanyGet>();
    public busquedaRealizada: boolean = false;
    formBusqueda: FormGroup;
    constructor(private http: HttpClient, fb: FormBuilder, private persistence: PersistenceService, private router: Router, title: Title, meta: Meta) {
        this.formBusqueda = fb.group({
            'selectCategoria': '',
            'selectSubCategoria': ''
        });
        title.setTitle('Busqueda - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Busqueda de vendedores para la app comprador de Cotizame' }
        ]);
    }
    ngOnInit() {
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/categories/subcategories?active=true";
        this.http.get<Category[]>(this.path)
            .subscribe(
            data => {
                this.categories = data;
                this.categoryDefault = this.categories[0];
                console.log(this.categories);
                for (let i = 0; i < this.categories.length; i++) {
                    for (let j = 0; j < this.categories[i].subcategories.length; j++) {
                        this.subcategories.push(this.categories[i].subcategories[j]);
                    }
                }
                console.log(this.subcategories);
                this.subCategoryDefault = this.subcategories[0];
            },
            err => {

            }
            );
    }
    buscar(form: any): void {
        this.categoryBind = this.formBusqueda.controls['selectCategoria'].value;
        this.subCategoryBind = this.formBusqueda.controls['selectSubCategoria'].value;
        for (let i = 0; i < this.categoryBind.length; i++) {
            this.arrayCat.push(this.categoryBind[i].categoryID);
        }
        for (let i = 0; i < this.subCategoryBind.length; i++) {
            this.arraySubCat.push(this.subCategoryBind[i].subcategoryID);
        }
        this.path = "https://cotizame-api.azurewebsites.net/api/v1/sellers/search"
        this.http.post<CompanyGet[]>(this.path,
            {
                categories: this.arrayCat,
                subcategories: this.arraySubCat
            },
            {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
            })
            .subscribe(
            data => {
                this.companies = data;
                this.persistence.set('arrayCompanies', this.companies, { type: StorageType.SESSION });
                this.busquedaRealizada = true;
            },
            err => {

            }
            )
    }
    perfil(ID: any) {
        console.log(ID);
        this.persistence.set('IDSeller', ID, { type: StorageType.SESSION });
        this.router.navigate(['user/search/seller/profile']);
    }
}