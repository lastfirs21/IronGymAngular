import { ActivatedRoute } from '@angular/router';
import { PagamentoService } from './../services/pagamento.service';
import { Component, OnInit } from '@angular/core';
import { Pagamento } from '../models/Pagamento.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css']
})
export class ListarPagamentosComponent implements OnInit {



  editSubject: Subject<Pagamento> = new Subject<Pagamento>(); // envia pagamento para editar
  addSubject?: number; // envia pagamento para adicionar
  excludeSubject: Subject<void> = new Subject<void>();// para atualizar ao excluir
  modoEdicao : boolean = false;
  pagamentos : Pagamento[] = [];
  validaeExclusao: boolean = false;
  constructor(private pagamentoService: PagamentoService, private route: ActivatedRoute) { }



  ngOnInit(): void {
    this.listar();
    let id= this.route.snapshot.params["ID"];
    if(id>0)
    {

      this.adicionarPagamentoPorAluno(id);
    }
  }

  listar(){


    this.pagamentoService.listar().subscribe((pagamentos: Pagamento[])=>{
      this.pagamentos = pagamentos;
    });


  }

  adicionarPagamentoPorAluno(id: number){
    this.addSubject =id;
  }


  adcionar()
  {
    this.modoEdicao = false;
    this.listar();
  }


  editar(pagamento: Pagamento)
  {
    this.modoEdicao = true;
    this.editSubject.next(pagamento);
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
    this.pagamentoService.excluir(id).subscribe(data => {
    this.listar();
    this.excludeSubject.next();
    });}

  }




}
