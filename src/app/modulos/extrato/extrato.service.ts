import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
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

  public findAll(): Observable<Extrato[]> {
    return this.http.get<Extrato[]>(`${this.api}/listar`);
  }
  
}
