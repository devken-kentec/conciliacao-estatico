import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public formatarNumerosDecimais(numero: number):string {
    let retorno = "";
    if(numero > 0){
      const formatadorBRL = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        retorno = formatadorBRL.format(numero);
    } else if(numero = 0) {
        retorno = " - ";
    }
    return retorno;
  }
}
