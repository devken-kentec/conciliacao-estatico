import { Routes } from '@angular/router';

export const conciliadoRoutes: Routes = [
    { path: '', title: "Conciliado", loadComponent: ()=> import('./conciliado-list/conciliado-list.component').then((p)=> p.ConciliadoListComponent) },
    { path: ':idAgencia/:dataInicial/:dataFinal/:tipo', title: "Conciliado", loadComponent: ()=> import('./conciliado-list/conciliado-list.component').then((p)=> p.ConciliadoListComponent) }
];
