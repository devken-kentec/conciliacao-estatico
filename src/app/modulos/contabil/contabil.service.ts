import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environments/environments";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contabil } from "../../domain/contabil.domain";

@Injectable({
  providedIn: 'root'
})
export class ContabilService {

  private readonly api = `${environment.api}/conciliacao/api/v1/contabil`;
  private tokenHeader: string =  environment.TOKEN;

  private http = inject(HttpClient);

  constructor() { }

  public fullList(id: number, dataInicial: string, dataFinal:string): Observable<number> {
      const params = new HttpParams().set('id', id)
                                   .set('dataInicial', dataInicial)
                                   .set('dataFinal', dataFinal)
      return this.http.get<number>(`${this.api}/totalLista?${params.toString()}`);
  }

  public findAll(page: number, size: number): Observable<Contabil[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Contabil[]>(`${this.api}/listar?${params.toString()}`);
  }

  public findAllFilter(id: number, dataInicial: string, dataFinal:string, page: number, size: number): Observable<Contabil[]> {
      const params = new HttpParams().set('id', id)
                                     .set('dataInicial', dataInicial)
                                     .set('dataFinal', dataFinal)
                                     .set('page', page)
                                     .set('size', size);
      return this.http.get<Contabil[]>(`${this.api}/listarFiltro?${params.toString()}`);
    }

  public mostrarSemelhante(): Observable<any> {
    return this.http.get<any>(`${this.api}/mostrarSemelhante`);
  }

  public mostrarDetalheDebito(contabil: Contabil): Observable<any> {
      return this.http.get<any>(`${this.api}/mostrarDetalheDebito/${contabil.debito}/${contabil.id}`);
  }

  public mostrarDetalheCredito(contabil: Contabil): Observable<any> {
    return this.http.get<any>(`${this.api}/mostrarDetalheCredito/${contabil.credito}/${contabil.id}`);
  }

  public totalDebitoCreditoContabilIguais(id: number, dataInicial: string, dataFinal:string): Observable<any>{
    const params = new HttpParams().set('id', id)
                                    .set('dataInicial', dataInicial)
                                    .set('dataFinal', dataFinal)
    return this.http.get<any>(`${this.api}/totalDebitoCreditoContabilIgual?${params.toString()}`)
  }

  public totalDebitoCreditoContabilDiferente(id: number, dataInicial: string, dataFinal: string): Observable<any>{
    const params = new HttpParams().set('id', id)
                                    .set('dataInicial', dataInicial)
                                    .set('dataFinal', dataFinal)
    return this.http.get<any>(`${this.api}/totalDebitoCreditoContabilDiferente?${params.toString()}`)
  }
}
