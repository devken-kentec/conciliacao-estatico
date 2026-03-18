import { Routes } from "@angular/router";

export const extratoRoutes: Routes = [
    { path: '', title: "Extrato", loadComponent: ()=> import('./extrato-list/extrato-list.component').then((p)=> p.ExtratoListComponent) }
];
