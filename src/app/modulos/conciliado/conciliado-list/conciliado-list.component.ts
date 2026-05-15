import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Extrato } from '../../../domain/extrato.domain';
import { ExtratoService } from '../../extrato/extrato.service';
import { SharedService } from '../../../shared/shared.service';
import { take } from 'rxjs';
import { Contabil } from '../../../domain/contabil.domain';
import { ContabilService } from '../../contabil/contabil.service';

@Component({
  selector: 'app-conciliado-list',
  imports: [ReactiveFormsModule, FormsModule, [NgStyle]],
  templateUrl: './conciliado-list.component.html',
  styleUrl: './conciliado-list.component.css',
})
export class ConciliadoListComponent {
  private extratoService = inject(ExtratoService);
  private contabilService = inject(ContabilService);
  private fb = inject(FormBuilder);
  public sharedService = inject(SharedService);
  private route = inject(ActivatedRoute);
  public extratos: Extrato[] = [];
  public contabil: Contabil[] = [];
  public banco!: string;
  public agencia!: string;
  public conta!: string;
  public paginaForm!: FormGroup;
  public paginaForm2!: FormGroup;
  public totalElementsExt = 0;
  public totalElementsCont = 0;
  public totalPages = 0;
  public totalPages2 = 0;
  public pagina = 0;
  public pagina2 = 0;
  public tamanho = 50;
  public tamanho2 = 50;
  public totalDebitoPagina: number = 0;
  public totalCreditoPagina: number = 0;
  public idAgencia!: number;
  public dataInicial!: string;
  public dataFinal!: string;

  ngOnInit() {
    const routeParans = this.route.snapshot.params;
    if (
      routeParans['idAgencia'] !== '' &&
      routeParans['idAgencia'] > 0 &&
      routeParans['idAgencia'] !== undefined
    ) {
      this.idAgencia = routeParans['idAgencia'];
      this.dataInicial = routeParans['dataInicial'];
      this.dataFinal = routeParans['dataFinal'];
      this.listarExtratoPaginadoFiltro(
        this.idAgencia,
        this.dataInicial,
        this.dataFinal,
        this.pagina,
        this.tamanho,
      );
      this.listarContabilPaginadoFiltro(
        this.idAgencia,
        this.dataInicial,
        this.dataFinal,
        this.pagina2,
        this.tamanho2,
      );
      this.totalListaExtrato();
      this.totalListaContabil();
    }

    this.paginaForm = this.fb.group({
      quantPag: [50],
    });

    this.paginaForm2 = this.fb.group({
      quantPag: [50],
    });
  }

  public totalListaExtrato(): void {
    this.extratoService
      .fullList(this.idAgencia, this.dataInicial, this.dataFinal)
      .pipe(take(1))
      .subscribe((res: number) => {
        this.totalElementsExt = res;
      });
  }

  public totalListaContabil(): void {
    this.contabilService
      .fullList(this.idAgencia, this.dataInicial, this.dataFinal)
      .pipe(take(1))
      .subscribe((res: number) => {
        this.totalElementsCont = res;
      });
  }

  public listarExtratoPaginadoFiltro(
    id: number,
    dataInical: string,
    dataFinal: string,
    page: number,
    size: number,
  ) {
    this.extratoService
      .findAllFilter(id, dataInical, dataFinal, page, size)
      .pipe(take(1))
      .subscribe((res: Extrato[]) => {
        //console.log(res);
        res.forEach((element) => {
          this.totalDebitoPagina = this.totalDebitoPagina + element.debito;
          this.totalCreditoPagina = this.totalCreditoPagina + element.credito;
        });
        this.extratos = res;
        this.banco = res[0].banco;
        this.agencia = res[0].agencia;
        this.conta = res[0].conta;
        //this.carregando = true;
        if (this.totalElementsExt > this.paginaForm.get('quantPag')?.value) {
          this.totalPages =
            this.totalElementsExt / this.paginaForm.get('quantPag')?.value;
        } else {
          this.totalPages = 1;
        }
      });
  }

  public paginaMenor(): void {
    if (this.pagina <= 0) {
      this.pagina = 0;
    } else {
      this.pagina = this.pagina - 1;
    }
    //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    this.listarExtratoPaginadoFiltro(
      this.idAgencia,
      this.dataInicial,
      this.dataFinal,
      this.pagina,
      this.paginaForm.get('quantPag')?.value,
    );
  }

  public paginaMaior(): void {
    if (this.totalPages > 1) {
      this.pagina = this.pagina + 1;
      //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
      this.listarExtratoPaginadoFiltro(
        this.idAgencia,
        this.dataInicial,
        this.dataFinal,
        this.pagina,
        this.paginaForm.get('quantPag')?.value,
      );
    }
  }

  public atualizaPagina(): void {
    this.pagina = 0;
    //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    this.listarExtratoPaginadoFiltro(
      this.idAgencia,
      this.dataInicial,
      this.dataFinal,
      this.pagina,
      this.paginaForm.get('quantPag')?.value,
    );
  }

  public listarContabilPaginadoFiltro(
    id: number,
    dataInical: string,
    dataFinal: string,
    page: number,
    size: number,
  ) {
    this.totalDebitoPagina = 0;
    this.totalCreditoPagina = 0;
    this.contabilService
      .findAllFilter(id, dataInical, dataFinal, page, size)
      .pipe(take(1))
      .subscribe((res: Contabil[]) => {
        console.log(res);
        res.forEach((element) => {
          // this.totalDebitoPagina = this.totalDebitoPagina + element.debito;
          // this.totalCreditoPagina = this.totalCreditoPagina + element.credito;
        });
        //console.log(this.totalDebitoPagina);
        //console.log(this.totalCreditoPagina);
        //this.carregando = true;
        if (this.totalElementsCont > this.paginaForm2.get('quantPag')?.value) {
          this.totalPages2 =
            this.totalElementsCont / this.paginaForm2.get('quantPag')?.value;
        } else {
          this.totalPages2 = 1;
        }
      });
  }

  public paginaMenorCont(): void {
    if (this.pagina2 <= 0) {
      this.pagina2 = 0;
    } else {
      this.pagina2 = this.pagina2 - 1;
    }
    //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
    this.listarContabilPaginadoFiltro(
      this.idAgencia,
      this.dataInicial,
      this.dataFinal,
      this.pagina2,
      this.paginaForm2.get('quantPag')?.value,
    );
  }

  public paginaMaiorCont(): void {
    if (this.totalPages2 > 1) {
      this.pagina2 = this.pagina2 + 1;
      //this.listarExtratoPaginado(this.pagina, this.paginaForm.get('quantPag')?.value);
      this.listarContabilPaginadoFiltro(
        this.idAgencia,
        this.dataInicial,
        this.dataFinal,
        this.pagina2,
        this.paginaForm2.get('quantPag')?.value,
      );
    }
  }

  public atualizaPaginaCont(): void {
    this.pagina2 = 0;
    this.listarContabilPaginadoFiltro(
      this.idAgencia,
      this.dataInicial,
      this.dataFinal,
      this.pagina2,
      this.paginaForm2.get('quantPag')?.value,
    );
  }
}
