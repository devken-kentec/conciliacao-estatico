import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Banco } from '../../domain/banco.domain';
import { AgenciaConta } from '../../domain/agencia-conta.domain';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private readonly api = `${environment.api}/conciliacao/api/v1/banco`;
  private tokenHeader: string =  environment.TOKEN;

  private http = inject(HttpClient);

  constructor() { }

  public findAll(): Observable<Banco[]> {
      return this.http.get<Banco[]>(`${this.api}/listarBanco`);
  }

  public listarAgenciaConta(id: number): Observable<AgenciaConta[]> {
      return this.http.get<AgenciaConta[]>(`${this.api}/listarAgencia/${id}`);
  }
}
