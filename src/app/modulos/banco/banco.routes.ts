import { Routes } from '@angular/router';

export const bancoRoutes: Routes = [
    { path: '', title: "Bancos", loadComponent: ()=> import('./banco-list/banco-list.component').then((p)=> p.BancoListComponent) },
    { path: 'new', title: "Cadastrar Banco", loadComponent: ()=> import('./banco-form/banco-form.component').then((p)=> p.BancoFormComponent) }
];
