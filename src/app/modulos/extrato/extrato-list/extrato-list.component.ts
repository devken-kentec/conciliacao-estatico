import { SharedService } from './../../../shared/shared.service';
import { Component, inject } from '@angular/core';
import { ExtratoService } from '../extrato.service';
import { take, pipe } from 'rxjs';
import { Extrato } from '../../../domain/extrato.domain';

@Component({
  selector: 'app-extrato-list',
  imports: [],
  templateUrl: './extrato-list.component.html',
  styleUrl: './extrato-list.component.css'
})
export class ExtratoListComponent {

    private extratoService = inject(ExtratoService);
    public sharedService = inject(SharedService);
    public extratos: Extrato[] = [];
    public banco!: string;
    public agencia!: string;
    public conta!: string;

    ngOnInit(){
      this.listarTodos()
    }


    public listarTodos(){
      this.extratoService.findAll().pipe(take(1)).subscribe((res: Extrato[])=>{
         this.extratos = res;
         this.banco = res[0].banco;
         this.agencia = res[0].agencia;
         this.conta = res[0].conta;
      });
    }
}
