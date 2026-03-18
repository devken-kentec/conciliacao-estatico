import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banco-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './banco-form.component.html',
  styleUrl: './banco-form.component.css'
})
export class BancoFormComponent {
  private fb = inject(FormBuilder)
  bancoForm!: FormGroup;

  ngOnInit(): void {
    this.bancoForm = this.fb.group({
      id:[null],
      descricao: [],
      status:[]
    });
  }
}
