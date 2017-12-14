import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './controller/login.component';
import { RegisterComponent } from './controller/register.component';
import { PrincipalComponent } from './controller/principal-component';
import { DashboardComponent } from './controller/dashboard.component';
import { SearchComponent } from './controller/search.component';
import { ProfileSellerComponent } from './controller/profile-seller.component';
import { SendQuoteComponent } from './controller/send-quote.component';
import { QuotationsComponent1 } from './controller/quotations-1.component';
import { QuotationsComponent2 } from './controller/quotations-2.component';
import { QuotationsComponent3 } from './controller/quotations-3.component';
import { QuotationsComponent4 } from './controller/quotations-4.component';
import { QuotationsComponent5 } from './controller/quotations-5.component';
import { QuotationsComponent6 } from './controller/quotations-6.component';
import { QuotationDetailComponent } from './controller/quotation-detail.component';
import { ProfileComponent } from './controller/profile.componen';

//aqui se insertan los componentes que se van a cargar de acuerdo a las rutas

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

const appRoutesDashboard: Routes = [
    {
        path: 'user', component: PrincipalComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'search', component: SearchComponent },
            { path: 'search/seller/profile', component: ProfileSellerComponent },
            { path: 'search/seller/quote', component: SendQuoteComponent },
            { path: 'quotations-1', component: QuotationsComponent1 },
            { path: 'quotations-2', component: QuotationsComponent2 },
            { path: 'quotations-3', component: QuotationsComponent3 },
            { path: 'quotations-4', component: QuotationsComponent4 },
            { path: 'quotations-5', component: QuotationsComponent5 },
            { path: 'quotations-6', component: QuotationsComponent6 },
            { path: 'quotation/detail', component: QuotationDetailComponent }
        ]
    }
]
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const routingSeller: ModuleWithProviders = RouterModule.forChild(appRoutesDashboard);

