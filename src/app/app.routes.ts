import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'filtro', loadChildren: ()=> import('./modulos/filtro/filtro.routes').then((p)=> p.filtroRoutes) },
    { path: 'extrato', loadChildren: ()=> import('./modulos/extrato/extrato.routes').then((p)=> p.extratoRoutes) },
    { path: 'banco', loadChildren: ()=> import('./modulos/banco/banco.routes').then((p)=> p.bancoRoutes) },
    { path: 'contabil', loadChildren: ()=> import('./modulos/contabil/contabil.routes').then((p)=> p.contabilRoutes)}
];
