import { ContabilListComponent } from './../../contabil/contabil-list/contabil-list.component';
import { Component } from '@angular/core';
import { FiltroFormComponent } from "../../filtro/filtro-form/filtro-form.component";

@Component({
  selector: 'app-base-form',
  imports: [
    ContabilListComponent,
    FiltroFormComponent
],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css'
})
export class BaseFormComponent {

}
