import { SharedService } from './../../../shared/shared.service';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BancoService } from '../../banco/banco.service';
import { take } from 'rxjs';
import { Banco } from '../../../domain/banco.domain';
import { AgenciaConta } from '../../../domain/agencia-conta.domain';

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
  private bancoService = inject(BancoService);
  private sharedService = inject(SharedService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public filtroForm!: FormGroup;
  public bancos: Banco[] = [];
  public agencias: AgenciaConta[] = [];

  ngOnInit(): void {
    this.filtroForm = this.fb.group({
      banco:[],
      agenciaConta:[],
      dataInicial:[],
      dataFinal:[],
      tipo:[]
    });
    this.comboBox();
  }

  public comboBox(){
    this.selectBanco();
  }

  public selectBanco(){
    this.bancoService.findAll().pipe(take(1)).subscribe(
        res => this.bancos = res
    );
  }

  public selectAgenciaConta(){
    let banco = this.filtroForm.get("banco")?.value;
    this.bancoService.listarAgenciaConta(banco).pipe(take(1)).subscribe(
        res => this.agencias = res
    );
  }

  public onSubmit(): void {
    let form = this.filtroForm;
    if(form.valid){

        let pd = this.sharedService.primeiroDia(form.get("dataInicial")?.value);
        let ud = this.sharedService.ultimoDia(form.get("dataFinal")?.value);

        let idAgenciaConta = form.get("agenciaConta")?.value
        let di = this.sharedService.formatarDate(pd);
        let df = this.sharedService.formatarDate(ud);
        let caminho = form.get("tipo")?.value;

        if(caminho === "extrato") {
          //this.router.navigate(['/extrato', idAgenciaConta, di, df, caminho]);
          const url = this.router.createUrlTree(['/extrato', idAgenciaConta, di, df, caminho]).toString();
          window.open(url, '_blank');
        } else {
          //this.router.navigate(["/contabil", idAgenciaConta, pd, ud, caminho]);
          const url = this.router.createUrlTree(['/contabil', idAgenciaConta, pd, ud, caminho]).toString();
          window.open(url, '_blank');
        }

    }
  }
}
