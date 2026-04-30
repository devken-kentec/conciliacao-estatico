import { SharedService } from './../../../shared/shared.service';
import { Component, inject } from '@angular/core';
import { ExtratoService } from '../extrato.service';
import { take, pipe } from 'rxjs';
import { Extrato } from '../../../domain/extrato.domain';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { ExratoConciliado } from '../../../domain/extrato-conciliado';

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
    private fb = inject(FormBuilder);
    public sharedService = inject(SharedService);
    public extratos: Extrato[] = [];
    public banco!: string;
    public agencia!: string;
    public conta!: string;
    public paginaForm!: FormGroup;
    public modalForm!: FormGroup;
    public totalElements = 0;
    public totalPages = 0;
    public pagina = 0;
    public tamanho = 50;
    public debitoLocalizado: boolean = false;
    public creditoLocalizado: boolean = false;
    public tituloModal: string = "";
    public modalAbre: boolean = false;

  ngOnInit(){
    //this.listarTodos()
      this.paginaForm = this.fb.group({
        quantPag: [ 50 ]
      });

      this.modalForm = this.fb.group({
        id: [],
        credito: [],
        creditoId: [],
        dataCred: [],
        dataDeb: [],
        debito: [],
        debitoId: []
      });

      this.totalListaExtrato();
      this.listarExtratoPaginado(this.pagina, this.tamanho);
  }

  public totalListaExtrato(): void {
      this.extratoService.fullList().pipe(take(1)).subscribe((res: number)=>{
      this.totalElements = res;
    });
  }

  public mostrarSemelhante(): void {
    this.extratoService.mostrarSemelhante().pipe(take(1)).subscribe((res:any)=>{
        console.log(res)
     });
  }

  public maisInformacoesDebito(item: Extrato): void{
    this.extratoService.mostrarDetalheDebito(item).pipe(take(1)).subscribe((res: ExratoConciliado)=>{
        this.modalAbre = item.statusDebito;
        console.log(this.modalAbre);
        if(this.modalAbre){
          this.tituloModal = "Débito";
          this.modalForm.get("id")?.setValue(res.id);
          this.modalForm.get("debitoId")?.setValue(res.debitoId);
          this.modalForm.get("debito")?.setValue(res.debito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
          this.modalForm.get("creditoId")?.setValue(res.creditoId);
          this.modalForm.get("credito")?.setValue(res.credito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        }
    });
  }

  public maisInformacoesCredito(item: Extrato): void{
    this.extratoService.mostrarDetalheCredito(item).pipe(take(1)).subscribe((res: ExratoConciliado)=>{
        this.modalAbre = item.statusCredito;
        console.log(this.modalAbre);
        if(this.modalAbre){
          this.tituloModal = "Crédito";
          this.modalForm.get("id")?.setValue(res.id);
          this.modalForm.get("debitoId")?.setValue(res.debitoId);
          this.modalForm.get("debito")?.setValue(res.debito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
          this.modalForm.get("creditoId")?.setValue(res.creditoId);
          this.modalForm.get("credito")?.setValue(res.credito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        }
    });
  }

  public limparModal(){
    this.modalAbre = false;
    this.modalForm.reset();
  }

  public listarExtratoPaginado(page: number, size: number){
    this.extratoService.findAll(page, size).pipe(take(1)).subscribe((res: Extrato[])=>{
        this.extratos = res;
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
