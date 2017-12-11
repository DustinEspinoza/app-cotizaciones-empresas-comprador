import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './controller/login.component';
import { RegisterComponent } from './controller/register.component';
import { PrincipalComponent } from './controller/principal-component';
import { DashboardComponent } from './controller/dashboard.component';

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
            { path: 'dashboard', component: DashboardComponent }
        ]
    }
]
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const routingSeller: ModuleWithProviders = RouterModule.forChild(appRoutesDashboard);

