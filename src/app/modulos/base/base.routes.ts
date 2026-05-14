import { Routes } from "@angular/router";

export const baseRoutes: Routes = [
     { path: '', title: "Contabil", loadComponent: ()=> import('./base-form/base-form.component').then((p)=> p.BaseFormComponent) },
    // { path: ':idAgencia/:dataInicial/:dataFinal/:tipo', title: "Contabil", loadComponent: ()=> import('./contabil-list/contabil-list.component').then((p)=> p.ContabilListComponent) }
];
