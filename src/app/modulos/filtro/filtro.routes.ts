import { Routes } from '@angular/router';

export const filtroRoutes: Routes = [
    { path: '', title: "Filtro", loadComponent: ()=> import('./filtro-form/filtro-form.component').then((p)=> p.FiltroFormComponent) }
];
