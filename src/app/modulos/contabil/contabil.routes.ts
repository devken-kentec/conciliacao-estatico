import { Routes } from '@angular/router';

export const contabilRoutes: Routes = [
    { path: '', title: "Contabil", loadComponent: ()=> import('./contabil-list/contabil-list.component').then((p)=> p.ContabilListComponent) }
];
