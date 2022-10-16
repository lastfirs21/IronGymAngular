import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Despesa } from '../models/Despesa.model';
import { DespesaService } from '../services/despesa.service';

@Component({
  selector: 'app-listar-despesas',
  templateUrl: './listar-despesas.component.html',
  styleUrls: ['./listar-despesas.component.css']
})
export class ListarDespesasComponent implements OnInit {

  eventsSubject: Subject<Despesa> = new Subject<Despesa>();
  despesas : Despesa[] = [];
  modoEdicao: boolean= false;
  validaeExclusao: boolean = false;

  constructor(private despesaService : DespesaService) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.despesaService.listar().subscribe((despesas: Despesa[])=>{
      this.despesas = despesas;
    });
  }

  adcionar()
  {
    this.modoEdicao = false;
    this.listar();
  }


  editar(despesa: Despesa)
  {
    this.modoEdicao = true;
    this.eventsSubject.next(despesa);
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
      this.despesaService.excluir(id).subscribe(data => {
        this.listar();
      });
    }
  }
}
