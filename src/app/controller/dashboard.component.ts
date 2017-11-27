import { Component } from '@angular/core';
import { tiposCotizaciones } from '../model/tipos-cotizaciones';

@Component({
    selector: 'dashboard',
    templateUrl: '../view/dashboard.component.html'
})

export class DashboardComponent {
    tipos: tiposCotizaciones[] = [new tiposCotizaciones("Cotizaciones Pendientes", 5),
    new tiposCotizaciones("Cotizaciones enviadas", 1),
    new tiposCotizaciones("Cotizaciones a negociar", 3),
    new tiposCotizaciones("Cotizaciones aceptadas", 1),
    new tiposCotizaciones("Cotizaciones canceladas", 2)];
}