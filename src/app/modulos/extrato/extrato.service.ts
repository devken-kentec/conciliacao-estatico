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

  public fullList(): Observable<number> {
    return this.http.get<number>(`${this.api}/totalLista`);
  }

  public findAll(page: number, size: number): Observable<Extrato[]> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<Extrato[]>(`${this.api}/listar?${params.toString()}`);
  }

  public verificaDebito(valor: number, id: number, data: string): Observable<any> {
    return this.http.get<any>(`${this.api}/verificaDebito/${valor}/${id}/${data}`);
  }

}
