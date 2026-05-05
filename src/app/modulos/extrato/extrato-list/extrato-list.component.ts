import { SharedService } from './../../../shared/shared.service';
import { Component, inject } from '@angular/core';
import { ExtratoService } from '../extrato.service';
import { take, pipe } from 'rxjs';
import { Extrato } from '../../../domain/extrato.domain';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { ExratoConciliado } from '../../../domain/extrato-conciliado';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-extrato-list',
  imports: [
        RouterLink,
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
    private route = inject(ActivatedRoute);
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
    public totalDebitoIgual: any = 0;
    public totalCreditoIgual: any = 0;
    public totalDebitoDif: any = 0;
    public totalCreditoDif: any = 0;
    public totalDebitoPagina: number = 0;
    public totalCreditoPagina: number = 0;
    public idAgencia!: number;
    public dataInicial!: string;
    public dataFinal!: string;

  ngOnInit(){
    const routeParans = this.route.snapshot.params;
    if(routeParans["idAgencia"] !== "" && routeParans["idAgencia"] > 0 && routeParans["idAgencia"] !== undefined){
      this.idAgencia = routeParans["idAgencia"];
      this.dataInicial = routeParans["dataInicial"];
      this.dataFinal = routeParans["dataFinal"];
      this.totalListaExtrato();
      this.calculaTotalDebitoCreditoExtratoIgual();
      this.calculaTotalDebitoCreditoExtratoDiferente();
      this.listarExtratoPaginadoFiltro(this.idAgencia, this.dataInicial, this.dataFinal, this.pagina, this.tamanho);
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

  public totalListaExtrato(): void {
      this.extratoService.fullList(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: number)=>{
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
        res.forEach(element => {
            this.totalDebitoPagina = this.totalDebitoPagina + element.debito;
            this.totalCreditoPagina = this.totalCreditoPagina + element.credito;
         });
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

  public listarExtratoPaginadoFiltro(id: number, dataInical: string, dataFinal: string, page: number, size: number){
    this.extratoService.findAllFilter(id, dataInical, dataFinal, page, size).pipe(take(1)).subscribe((res: Extrato[])=>{
        res.forEach(element => {
            this.totalDebitoPagina = this.totalDebitoPagina + element.debito;
            this.totalCreditoPagina = this.totalCreditoPagina + element.credito;
         });
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
    //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    this.listarExtratoPaginadoFiltro(this.idAgencia, this.dataInicial, this.dataFinal, this.pagina, this.paginaForm.get('quantPag')?.value);
  }

  public paginaMaior(): void {
    if(this.totalPages > 1){
      this.pagina = this.pagina + 1;
      //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
      this.listarExtratoPaginadoFiltro(this.idAgencia, this.dataInicial, this.dataFinal, this.pagina, this.paginaForm.get('quantPag')?.value);
    }
  }

  public atualizaPagina(): void {
    this.pagina = 0
    //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    this.listarExtratoPaginadoFiltro(this.idAgencia, this.dataInicial, this.dataFinal, this.pagina, this.paginaForm.get('quantPag')?.value);
  }

  public calculaTotalDebitoCreditoExtratoIgual(): void {
      this.extratoService.totalDebitoCreditoExtratoIguais(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: any)=>{
        //console.log(res);
        this.totalCreditoIgual = res[0];
        this.totalDebitoIgual = res[1];
      });
    }

    public calculaTotalDebitoCreditoExtratoDiferente(): void {
      this.extratoService.totalDebitoCreditoExtratoDiferente(this.idAgencia, this.dataInicial, this.dataFinal).pipe(take(1)).subscribe((res: any)=>{
        //console.log(res);
        this.totalCreditoDif = res[0];
        this.totalDebitoDif = res[1];
      });
    }
}
