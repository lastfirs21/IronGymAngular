import { InserirPagamentoComponent } from './../../Pagamento/inserir-pagamento/inserir-pagamento.component';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aluno } from '../Aluno.model';
import { debounceTime, filter, Subject } from 'rxjs';
import { AlunoService } from '../services-aluno/aluno.service';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css'],
})
export class ListarAlunosComponent implements OnInit {
  eventsSubject: Subject<Aluno> = new Subject<Aluno>();

  filtroVencidos!: boolean;
  filtro?: boolean;
  totalAlunos?: number;

  validaeExclusao: boolean = false;
  alunos: Aluno[] = [];
  dataAtual: Date = new Date();
  filtros: string[] = [];
  modoEdicao: boolean = false;
  searchBox: string = '';

  page: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  constructor(private alunoService: AlunoService, private router: Router) {}

  ngOnInit() {
    this.atualizarLista();
  }

  mudarFiltro(filtro?: boolean) {
    if(filtro == null)
    {
      this.filtro= undefined;
    }
    this.filtro = filtro;
  }

  atualizarLista() {
    this.alunoService
      .listar(this.searchBox)
      .pipe(debounceTime(1000))
      .subscribe((alunos: Aluno[]) => {
        this.alunos = alunos;

        if (this.filtroVencidos == true) {
          this.alunos = this.alunos.filter(
            (t) => t.statusMensalidade == 'Vencido'
          );
        }

        if (this.filtro == true) {
          this.alunos = this.alunos.filter((t) => t.status != 'Inativo');
        }
        if (this.filtro == false) {
          this.alunos = this.alunos.filter((t) => t.status == 'Inativo');
        }

        this.totalAlunos = this.alunos.length;

        this.totalPages = parseInt(
          (this.totalAlunos / this.pageSize + 1).toString()
        );
      });
    this.page = 1;
  }

  nextPage() {
    console.log(this.totalPages);
    if (this.page == this.totalPages) {
      return;
    } else {
      this.page++;
    }
  }

  previousPage() {
    if (this.page == 1) {
      return;
    }
    this.page--;
  }

  adicionar() {
    // callback de inserir e editar
    this.modoEdicao = false;
    this.limparVariaveis();
  }

  excluir(id: any) {
    if (this.validaeExclusao == false) {
      alert('Tem Certeza que Desaja Apagar? Clique Novamente para Confirmar !');
      this.validaeExclusao = true;
    } else {
      this.validaeExclusao = false;
      this.alunoService.excluir(id).subscribe((data) => {
        this.limparVariaveis();
      });
    }
  }

  gerarPagamento(myParam: any) {
    this.router.navigate(['listar-pagamentos', myParam]);
  }

  editar(aluno: Aluno) {
    this.modoEdicao = true;
    this.eventsSubject.next(aluno);
  }

  limparVariaveis() {
    this.atualizarLista();
  }

  desEdit() {
    this.modoEdicao = false;
  }
}
