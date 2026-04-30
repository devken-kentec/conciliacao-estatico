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

  public fullList(): Observable<number> {
      return this.http.get<number>(`${this.api}/totalLista`);
  }

  public findAll(page: number, size: number): Observable<Contabil[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Contabil[]>(`${this.api}/listar?${params.toString()}`);
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
}
