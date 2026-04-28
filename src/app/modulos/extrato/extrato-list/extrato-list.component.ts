import { SharedService } from './../../../shared/shared.service';
import { Component, inject } from '@angular/core';
import { ExtratoService } from '../extrato.service';
import { take, pipe } from 'rxjs';
import { Extrato } from '../../../domain/extrato.domain';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-extrato-list',
  imports: [
        ReactiveFormsModule,
        FormsModule,
        [NgStyle]
  ],
  templateUrl: './extrato-list.component.html',
  styleUrl: './extrato-list.component.css'
})
export class ExtratoListComponent {

    private extratoService = inject(ExtratoService);
    public sharedService = inject(SharedService);
    public extratos: Extrato[] = [];
    public banco!: string;
    public agencia!: string;
    public conta!: string;
    private fb = inject(FormBuilder);
    public  paginaForm!: FormGroup;
    public totalElements = 0;
    public totalPages = 0;
    public pagina = 0;
    public tamanho = 50;
    public debitoLocalizado: boolean = false;
    public creditoLocalizado: boolean = false;

    ngOnInit(){
      //this.listarTodos()
         this.paginaForm = this.fb.group({
          quantPag: [ 50 ]
        });

        this.totalListaExtrato();
        this.listarExtratoPaginado(this.pagina, this.tamanho);
    }

    public totalListaExtrato(): void {
      this.extratoService.fullList().pipe(take(1)).subscribe((res: number)=>{
      this.totalElements = res;
    });
  }

  public verificarDebito(valor: number, id: number, data: string): void {
    if(valor != 0){
     //console.log(valor, id, "D")

         this.extratoService.verificaDebito(valor, id, data).pipe(take(1)).subscribe((res:any)=>{
        this.debitoLocalizado = true
        console.log(res)
     });
    }
  }

  public verificarCredito(valor: number, id: number): void {
    if(valor != 0){
      console.log(valor, id, "C")
      this.creditoLocalizado= false;
    }

  }


  public listarExtratoPaginado(page: number, size: number){
    this.extratoService.findAll(page, size).pipe(take(1)).subscribe((res: Extrato[])=>{
        this.extratos = res;
        //console.log(res);
        this.banco = res[0].banco;
        this.agencia = res[0].agencia;
        this.conta = res[0].conta;
        //this.carregando = true;
        if(this.totalElements > this.paginaForm.get('quantPag')?.value){
          this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
        } else {
          this.totalPages = 1;
        }
      }
    );
  }

    public paginaMenor(): void {
    if(this.pagina <= 0){
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
    this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
  }

  public paginaMaior(): void {
    if(this.totalPages > 1){
      this.pagina = this.pagina + 1;
      this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    }
  }

  public atualizaPagina(): void {
    this.pagina = 0
    this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
  }
}
