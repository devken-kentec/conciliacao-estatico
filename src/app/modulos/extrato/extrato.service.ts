import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Extrato } from '../../domain/extrato.domain';

@Injectable({
  providedIn: 'root'
})
export class ExtratoService {

  private readonly api = `${environment.api}/conciliacao/api/v1/extrato`;
  private tokenHeader: string =  environment.TOKEN;

  private http = inject(HttpClient);

  constructor() { }

  public fullList(id: number, dataInicial: string, dataFinal:string): Observable<number> {
    const params = new HttpParams().set('id', id)
                                   .set('dataInicial', dataInicial)
                                   .set('dataFinal', dataFinal)
    return this.http.get<number>(`${this.api}/totalLista?${params.toString()}`);
  }

  public findAll(page: number, size: number): Observable<Extrato[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Extrato[]>(`${this.api}/listar?${params.toString()}`);
  }

  public findAllFilter(id: number, dataInicial: string, dataFinal:string, page: number, size: number): Observable<Extrato[]> {
    const params = new HttpParams().set('id', id)
                                   .set('dataInicial', dataInicial)
                                   .set('dataFinal', dataFinal)
                                   .set('page', page)
                                   .set('size', size);
    return this.http.get<Extrato[]>(`${this.api}/listarFiltro?${params.toString()}`);
  }

  public mostrarSemelhante(): Observable<any> {
    return this.http.get<any>(`${this.api}/mostrarSemelhante`);
  }

  public mostrarDetalheDebito(extrato: Extrato): Observable<any> {
    return this.http.get<any>(`${this.api}/mostrarDetalheDebito/${extrato.debito}/${extrato.id}`);
  }

  public mostrarDetalheCredito(extrato: Extrato): Observable<any> {
    return this.http.get<any>(`${this.api}/mostrarDetalheCredito/${extrato.credito}/${extrato.id}`);
  }

  public totalDebitoCreditoExtratoIguais(id: number, dataInicial: string, dataFinal:string): Observable<any>{
     const params = new HttpParams().set('id', id)
                                    .set('dataInicial', dataInicial)
                                    .set('dataFinal', dataFinal)
    return this.http.get<any>(`${this.api}/totalDebitoCreditoExtratoIgual?${params.toString()}`)
  }

  public totalDebitoCreditoExtratoDiferente(id: number, dataInicial: string, dataFinal:string): Observable<any>{
    const params = new HttpParams().set('id', id)
                                    .set('dataInicial', dataInicial)
                                    .set('dataFinal', dataFinal)
    return this.http.get<any>(`${this.api}/totalDebitoCreditoExtratoDiferente?${params.toString()}`)
  }
}
