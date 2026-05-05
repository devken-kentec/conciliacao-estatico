import { Routes } from "@angular/router";

export const extratoRoutes: Routes = [
    { path: '', title: "extrato", loadComponent: ()=> import('./extrato-list/extrato-list.component').then((p)=> p.ExtratoListComponent) },
    { path: ':idAgencia/:dataInicial/:dataFinal/:tipo', title: "extrato", loadComponent: ()=> import('./extrato-list/extrato-list.component').then((p)=> p.ExtratoListComponent) }
];
