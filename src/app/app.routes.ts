import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'extrato', loadChildren: ()=> import('./modulos/extrato/extrato.routes').then((p)=> p.extratoRoutes) },
    { path: 'banco', loadChildren: ()=> import('./modulos/banco/banco.routes').then((p)=> p.bancoRoutes) }
];
