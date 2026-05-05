import { Component, inject } from '@angular/core';
import { Banco } from '../../../domain/banco.domain';
import { BancoService } from '../banco.service';
import { take } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-banco-list',
  imports: [
    RouterModule
  ],
  templateUrl: './banco-list.component.html',
  styleUrl: './banco-list.component.css',
  preserveWhitespaces: true
})
export class BancoListComponent {

  private bancoService = inject(BancoService);
  public bancos: Banco[] = [];

  ngOnInit(){
    this.listarBancos();
  }

  public listarBancos(){
    this.bancoService.findAll().pipe(take(1)).subscribe((res:Banco[])=>{
      this.bancos = res;
    });
  }

}
