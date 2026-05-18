import { ContabilService } from './../contabil.service';
import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Contabil } from '../../../domain/contabil.domain';
import { Subscription, take } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Extrato } from '../../../domain/extrato.domain';

@Component({
  selector: 'app-contabil-list',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    [NgStyle]
  ],
  templateUrl: './contabil-list.component.html',
  styleUrl: './contabil-list.component.css',
  preserveWhitespaces: true
})
export class ContabilListComponent {

  private contabilService =inject(ContabilService);
  private fb = inject(FormBuilder);
  public sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
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
  public totalDebitoIgual: any = 0;
  public totalCreditoIgual: any = 0;
  public totalDebitoDif: any = 0;
  public totalCreditoDif: any = 0;
  public totalDebitoPagina: number = 0;
  public totalCreditoPagina: number = 0;
  public idAgencia!: number;
  public dataInicial!: string;
  public dataFinal!: string;
  public totalDebitoConciliado: any = 0;
  public totalCreditoConciliado: any = 0;
  public somaCreditoExtrato: number = 0;
  public creditosExtratoRecebidos!: Extrato[];


  ngOnInit(){

    const routeParans = this.route.snapshot.params;
    if(routeParans["idAgencia"] !== "" && routeParans["idAgencia"] > 0 && routeParans["idAgencia"] !== undefined){
      this.idAgencia = routeParans["idAgencia"];
      this.dataInicial = routeParans["dataInicial"];
      this.dataFinal = routeParans["dataFinal"];
      this.totalListaContabil();
      this.calculaTotalDebitoCreditoContabilIgual();
      this.calculaTotalDebitoCreditoContabilDiferente();
      this.listarContabilPaginadoFiltro(this.idAgencia, this.dataInicial, this.dataFinal, this.pagina, this.tamanho);
      this.calculaTotalDebitoCreditoContabilConciliado();
    }
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
  }

  public totalListaContabil(): void {
      this.contabilService.fullList(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: number)=>{
      this.totalElements = res;
    });
  }

  public mostrarSemelhante(): void {
    this.contabilService.mostrarSemelhante().pipe(take(1)).subscribe((res:any)=>{
        //console.log(res)
     });
  }

  public limparModal(){
    this.modalForm.reset();
  }

  public listarContabilPaginado(page: number, size: number){
      this.totalDebitoPagina = 0;
      this.totalCreditoPagina = 0;
      this.contabilService.findAll(page, size).pipe(take(1)).subscribe((res: Contabil[])=>{
         res.forEach(element => {
            this.totalDebitoPagina = this.totalDebitoPagina + element.debito;
            this.totalCreditoPagina = this.totalCreditoPagina + element.credito;
         });
          this.contabil = res;
          this.banco = res[0].banco;
          this.agencia = res[0].agencia;
          this.conta = res[0].conta;
          //console.log(this.totalDebitoPagina);
          //console.log(this.totalCreditoPagina);
          //this.carregando = true;
          if(this.totalElements > this.paginaForm.get('quantPag')?.value){
            this.totalPages = this.totalElements/this.paginaForm.get('quantPag')?.value;
          } else {
            this.totalPages = 1;
          }
        }
      );
    }

      public listarContabilPaginadoFiltro(id: number, dataInical: string, dataFinal: string, page: number, size: number){
      this.totalDebitoPagina = 0;
      this.totalCreditoPagina = 0;
      this.contabilService.findAllFilter(id, dataInical, dataFinal, page, size).pipe(take(1)).subscribe((res: Contabil[])=>{
        console.log(res);
        res.forEach(element => {
            this.totalDebitoPagina = this.totalDebitoPagina + element.debito;
            this.totalCreditoPagina = this.totalCreditoPagina + element.credito;
         });
          this.contabil = res;
          this.banco = res[0].banco;
          this.agencia = res[0].agencia;
          this.conta = res[0].conta;
          //console.log(this.totalDebitoPagina);
          //console.log(this.totalCreditoPagina);
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
            this.tituloModal = "Débito";
            this.modalForm.get("id")?.setValue(res.id);
            this.modalForm.get("debitoId")?.setValue(res.debitoId);
            this.modalForm.get("debito")?.setValue(res.debito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
            this.modalForm.get("creditoId")?.setValue(res.creditoId);
            this.modalForm.get("credito")?.setValue(res.credito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
      });
    }

    public maisInformacoesCredito(item: Contabil): void {
      this.contabilService.mostrarDetalheCredito(item).pipe(take(1)).subscribe((res: any)=>{
            this.tituloModal = "Crédito";
            this.modalForm.get("id")?.setValue(res.id);
            this.modalForm.get("debitoId")?.setValue(res.debitoId);
            this.modalForm.get("debito")?.setValue(res.debito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
            this.modalForm.get("creditoId")?.setValue(res.creditoId);
            this.modalForm.get("credito")?.setValue(res.credito.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
      });
    }

    public calculaTotalDebitoCreditoContabilIgual(): void {
      this.contabilService.totalDebitoCreditoContabilIguais(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: any)=>{
        //console.log(res);
        this.totalDebitoIgual = res[0];
        this.totalCreditoIgual = res[1];
      });
    }

    public calculaTotalDebitoCreditoContabilDiferente(): void {
      this.contabilService.totalDebitoCreditoContabilDiferente(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: any)=>{
        //console.log(res);
        this.totalDebitoDif = res[0];
        this.totalCreditoDif = res[1];
      });
    }

    public calculaTotalDebitoCreditoContabilConciliado(): void {
      this.contabilService.totalDebitoCreditoContabilConciliado(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: any)=>{
        //console.log(res);
        this.totalDebitoConciliado = res[0];
        this.totalCreditoConciliado = res[1];
      });
    }

    public maisInformacoesConciliacaoCredito(item: Contabil): void {
        // this.extratoService.conciliarCreditoExtratoContabilidade(item.id).pipe(take(1)).subscribe((res: ExtratoConciliado)=>{
        //     this.tituloModal = "Crédito";
        //     this.modalForm2.get("id")?.setValue(res.id);
        //     this.modalForm2.get("creditoExtratoId")?.setValue(res.creditoExtratoId);
        //     this.modalForm2.get("creditoExtrato")?.setValue(res.creditoExtrato.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        //     this.modalForm2.get("creditoContabilId")?.setValue(res.creditoContabilId);
        //     this.modalForm2.get("creditoContabil")?.setValue(res.creditoContabil.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
        //   });
      }

      public maisInformacoesConciliacaoDebito(tem: Contabil): void {

      }
}
