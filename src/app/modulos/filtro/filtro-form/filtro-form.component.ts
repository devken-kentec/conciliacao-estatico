import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-filtro-form',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './filtro-form.component.html',
  styleUrl: './filtro-form.component.css'
})
export class FiltroFormComponent {

  private fb = inject(FormBuilder);

  public filtroForm!: FormGroup;

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      banco:[],
      agenciaConta:[],
      dataInicial:[],
      dataFinal:[]
    });
  }
}
