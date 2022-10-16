import { Router } from '@angular/router';
import { AlunoService } from './../services/aluno.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aluno } from '../models/Aluno.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listar-alunos',
  templateUrl: './listar-alunos.component.html',
  styleUrls: ['./listar-alunos.component.css']
})
export class ListarAlunosComponent implements OnInit {

  eventsSubject: Subject<Aluno> = new Subject<Aluno>();


  validaeExclusao: boolean = false;
  alunos: Aluno[] = [];
  dataAtual: Date = new Date();
  filtros: string[] = [];
  modoEdicao: boolean = false;
  searchBox: string ='';

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit() {
    this.listar();
  }


  listar()
  {
    this.alunoService
    .listar()
    .subscribe((alunos: Aluno[])=>
    {
      this.alunos = alunos;

    });
  }

  adicionar() // callback de inserir e editar
  {
    this.modoEdicao = false;
    this.limparVariaveis();
  }

  listarVencidos(){
     this.alunos = this.alunos.filter(a => a.statusMensalidade == "Vencido");
  }
  listarInativos(){
    this.alunos = this.alunos.filter(a => a.status == "Inativo");
 }


  listarPorNome(){
    this.alunos = this.alunos.sort((a,b) => a.nome.localeCompare(b.nome));
  }


  buscarPorNome(){
    this.alunos = this.alunos.filter((a => a.nome.toUpperCase().match(this.searchBox.toUpperCase())));
    if(this.searchBox == "")
    {
      this.limparVariaveis();
    }
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
      this.alunoService.excluir(id).subscribe(data => {
        this.limparVariaveis();
      });
    }
  }




  gerarPagamento(myParam: any) {
    this.router.navigate(["listar-pagamentos", myParam]);
    }




    editar(aluno: Aluno)
    {
      this.modoEdicao = true;
      this.eventsSubject.next(aluno);
    }






    limparVariaveis()
    {
      this.listar();
      this.searchBox ="";
    }

}
