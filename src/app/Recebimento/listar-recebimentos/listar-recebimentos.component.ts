import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recebimento } from '../Recebimento.model';
import { RecebimentoService } from '../services-recebimento/recebimento-service.service';

@Component({
  selector: 'app-listar-recebimentos',
  templateUrl: './listar-recebimentos.component.html',
  styleUrls: ['./listar-recebimentos.component.css']
})
export class ListarRecebimentosComponent implements OnInit {

  eventsSubject: Subject<Recebimento> = new Subject<Recebimento>();
  recebimentos : Recebimento[] = [];
  modoEdicao: boolean= false;
  validaeExclusao: boolean = false;

  page: number = 1;
  pageSize: number =10;
  totalPages: number=0;

  constructor(private recebimentoService : RecebimentoService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.recebimentoService.listar().subscribe((recebimentos: Recebimento[])=>{
      this.recebimentos = recebimentos;
      this.totalPages =  parseInt((this.recebimentos.length/this.pageSize+1).toString());

    });

    this.page=1;
  }


  nextPage(){
    console.log(this.totalPages);
    if(this.page == this.totalPages)
    {
      return;
    }
    else{
      this.page++;
    }
  }

  previousPage(){
    if(this.page==1)
    {
      return;
    }
    this.page--;
  }

  desEdit(){
    this.modoEdicao = false;
  }


  adcionar()
  {
    this.modoEdicao = false;
    this.listar();
  }


  editar(recebimento: Recebimento)
  {
    this.modoEdicao = true;
    this.eventsSubject.next(recebimento);
  }

  excluir(id : any)
  {
    if(this.validaeExclusao == false)
    {
      alert("Tem Certeza que Desaja Apagar? Clique Novamente para Confirmar !");
            this.validaeExclusao = true;
    }
    else{
      this.validaeExclusao = false;
      this.recebimentoService.excluir(id).subscribe(data => {
        this.listar();
      });
    }
  }
}
