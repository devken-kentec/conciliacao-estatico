import { ContabilService } from './../contabil.service';
import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Contabil } from '../../../domain/contabil.domain';
import { take } from 'rxjs';

@Component({
  selector: 'app-contabil-list',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    [NgStyle]
  ],
  templateUrl: './contabil-list.component.html',
  styleUrl: './contabil-list.component.css'
})
export class ContabilListComponent {

  private contabilService =inject(ContabilService);
  private fb = inject(FormBuilder);
  public sharedService = inject(SharedService);
  public contabil: Contabil[] = [];
  public banco!: string;
  public agencia!: string;
  public conta!: string;
  public paginaForm!: FormGroup;
  public modalForm!: FormGroup;
  public totalElements = 0;
  public totalPages = 0;
  public pagina = 0;
  public tamanho = 50;
  public tituloModal: string = "";
  public modalAbre: boolean = false;

  ngOnInit(){
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

      this.totalListaContabil();
      this.listarContabilPaginado(this.pagina, this.tamanho);
  }

  public totalListaContabil(): void {
      this.contabilService.fullList().pipe(take(1)).subscribe((res: number)=>{
      this.totalElements = res;
    });
  }

  public mostrarSemelhante(): void {
    this.contabilService.mostrarSemelhante().pipe(take(1)).subscribe((res:any)=>{
        console.log(res)
     });
  }

  public limparModal(){
    this.modalAbre = false;
    this.modalForm.reset();
  }

  public listarContabilPaginado(page: number, size: number){
      this.contabilService.findAll(page, size).pipe(take(1)).subscribe((res: Contabil[])=>{
         console.log(res);
          this.contabil = res;
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
    this.listarContabilPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
  }

  public paginaMaior(): void {
    if(this.totalPages > 1){
      this.pagina = this.pagina + 1;
      this.listarContabilPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    }
  }

  public atualizaPagina(): void {
    this.pagina = 0
    this.listarContabilPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
  }

  public maisInformacoesDebito(item: Contabil): void{
      this.contabilService.mostrarDetalheDebito(item).pipe(take(1)).subscribe((res: any)=>{
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

    public maisInformacoesCredito(item: Contabil): void{
      this.contabilService.mostrarDetalheCredito(item).pipe(take(1)).subscribe((res: any)=>{
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
}
