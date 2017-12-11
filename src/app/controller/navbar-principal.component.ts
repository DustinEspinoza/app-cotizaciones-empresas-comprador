import { Component } from '@angular/core';
import { UserPost } from '../model/user-post';
import { PersistenceService, StorageType } from 'angular-persistence';
import { tiposCotizaciones } from '../model/tipos-cotizaciones';

@Component({
    selector: 'navbar-principal',
    templateUrl: '../view/navbar-principal.component.html'
})

export class NavbarPrincipalComponent {
    usrLogin: UserPost = new UserPost();
    constructor(private persistence: PersistenceService) { }
    ngOnInit() {
        this.usrLogin = this.persistence.get('postUser', StorageType.SESSION);
    }
    tipos: tiposCotizaciones[] = [new tiposCotizaciones("Cotizaciones Pendientes", 5),
    new tiposCotizaciones("Cotizaciones enviadas", 1),
    new tiposCotizaciones("Cotizaciones a negociar", 3),
    new tiposCotizaciones("Cotizaciones aceptadas", 1),
    new tiposCotizaciones("Cotizaciones canceladas", 2)];
}