import { Component } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'register',
    templateUrl: '../view/register.component.html'
})

export class RegisterComponent {
    constructor(title: Title, meta: Meta) {
        title.setTitle('Registro - Comprador');

        meta.addTags([
            { name: 'author', content: 'https://itcreed.me' },
            { name: 'keywords', content: 'cotizaciones, empresas, nicaragua, comprador' },
            { name: 'description', content: 'Registro para la app comprador de Cotizame' }
        ]);
    }
}