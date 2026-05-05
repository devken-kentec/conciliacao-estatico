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

  formatarDate(data: string){
    let dataCompleta = "";
			 let dia = data.substring(8,10);
			 let mes = data.substring(5,7);
       let ano = data.substring(0,4);

       if(dia.length == 1){
        dia = "0" + dia;
     }
      if(mes.length == 1){
        mes = "0" + mes
      }
     dataCompleta = dia+"/"+mes+"/"+ano
		 return dataCompleta;
  }

  primeiroDia(dataInicial: string){
    let monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    let now = new Date();
    if(dataInicial == "" || dataInicial == null){
      dataInicial = now.getFullYear()+"-"+monName[now.getMonth()] + "-" + "01";
    }
    return dataInicial;
  }

  ultimoDia(dataFinal: string){
    let monName = new Array ("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    let endDay = new Array ("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "30");
    let now = new Date();
    if(dataFinal == "" || dataFinal == null){
      dataFinal = now.getFullYear() +"-"+monName[now.getMonth()]+"-"+endDay[now.getMonth()];
    }
    return dataFinal;
  }
}
