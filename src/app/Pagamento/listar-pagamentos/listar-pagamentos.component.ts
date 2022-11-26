import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { Pagamento } from '../Pagamento.model';
import { PagamentoService } from '../services-pagamento/pagamento.service';

@Component({
  selector: 'app-listar-pagamentos',
  templateUrl: './listar-pagamentos.component.html',
  styleUrls: ['./listar-pagamentos.component.css'],
})
export class ListarPagamentosComponent implements OnInit {
  editSubject: Subject<Pagamento> = new Subject<Pagamento>(); // envia pagamento para editar
  addSubject?: number; // envia pagamento para adicionar
  excludeSubject: Subject<void> = new Subject<void>(); // para atualizar ao excluir
  modoEdicao: boolean = false;
  pagamentos: Pagamento[] = [];
  validaeExclusao: boolean = false;

  searchBox: string = '';


  page: number = 1;
  pageSize: number =10;
  totalPages: number=0;

  constructor(
    private pagamentoService: PagamentoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.listar();
    let id = this.route.snapshot.params['ID'];
    if (id > 0) {
      this.adicionarPagamentoPorAluno(id);

    }
  }

  atualizarLista() {
    this.pagamentoService
      .listar(this.searchBox)
      .pipe(debounceTime(1000))
      .subscribe((pagamentos: Pagamento[]) => {
        this.pagamentos = pagamentos;
        this.totalPages =  parseInt((this.pagamentos.length/this.pageSize+1).toString());
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

  listar() {
    this.pagamentoService.listar().subscribe((pagamentos: Pagamento[]) => {
      this.pagamentos = pagamentos;
    });
  }

  adicionarPagamentoPorAluno(id: number) {
    this.addSubject = id;
    var modal = document.getElementById("addButton");
    modal?.click();

    console.log( modal );

  }

  adcionar() {
    this.modoEdicao = false;
    this.listar();
  }

  desEdit() {
    this.modoEdicao = false;
  }
  editar(pagamento: Pagamento) {
    this.modoEdicao = true;
    this.editSubject.next(pagamento);
  }

  excluir(id: any) {
    if (this.validaeExclusao == false) {
      alert('Tem Certeza que Desaja Apagar? Clique Novamente para Confirmar !');
      this.validaeExclusao = true;
    } else {
      this.validaeExclusao = false;
      this.pagamentoService.excluir(id).subscribe((data) => {
        this.listar();
        this.excludeSubject.next();
      });
    }
  }

}
