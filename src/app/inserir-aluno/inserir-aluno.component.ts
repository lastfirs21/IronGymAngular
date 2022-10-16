import { PlanoService } from './../services/plano.service';
import { PersonalService } from './../services/personal.service';
import { AlunoService } from './../services/aluno.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aluno } from '../models/Aluno.model';
import { Personal } from '../models/Personal.model';
import { Plano } from '../models/Plano.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-inserir-aluno',
  templateUrl: './inserir-aluno.component.html',
  styleUrls: ['./inserir-aluno.component.css']
})


export class InserirAlunoComponent implements OnInit {

  eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<Aluno> = new Observable<Aluno>();


  aluno: Aluno = new Aluno();
  title: string= "Adicionar Aluno";
  personais: Personal[] = [];
  planos: Plano[] = [];

  modoEdicao: boolean = false;

  @Output() atualizarLista: EventEmitter<any> = new EventEmitter();


  constructor(private alunoService: AlunoService, private personalService: PersonalService,
    private planoService: PlanoService ) { }




  ngOnInit(){


    this.eventsSubscription = this.events.subscribe((aluno: Aluno) =>
    {
      this.modoEdicao = true;
      this.aluno = aluno;
      console.log(aluno);
      if(aluno.plano == null)
      {
        this.aluno.planoId = this.planos[0].id; // caso o plano ou personal tenha sido excluido
      }
      if(aluno.personal == null)
      {
        this.aluno.personalId = this.personais[0].id;
      }
      this.title= "Editar Aluno";
    } );
         this.listarCampos();
  }


  listarCampos(){

    this.personalService.listar().subscribe((personais: Personal[])=> {
      this.personais = personais;
      this.aluno.personalId = personais[0].id;
    });

    this.planoService.listar().subscribe((planos: Plano[])=> {
      this.planos = planos;
      this.aluno.planoId = planos[0].id;
    })

  }



  dataChanged(eventDate: any): Date {
    return new Date(eventDate);
  }




  adicionar(){
    this.alunoService.adicionar(this.aluno).subscribe(
      (resultado) => {
        this.limparCampos();
      }
      );
    }


    editar() {
    this.alunoService.editar(this.aluno).subscribe(
      (resultado) => {
        this.limparCampos();
      }
      );
    }


    submit(){

      if(this.aluno.nome.length < 4)
      {
        alert("O Campo Nome deve Ter Pelo Menos 4 Caracteres!");
        return;
      }
      if(this.aluno.telefone.length < 4)
      {
        console.log(this.aluno.telefone.length);
        alert("O Campo Telefone deve Ser Preenchido!");
        return;
      }

      if(this.planos.length == 0)
      {
        alert("Cadastre um Plano para Prosseguir!");
        return;
      }

      if(this.personais.length == 0)
      {
        alert("Cadastre um Personal para Prosseguir!");
        return;
      }

      if(this.aluno.planoId == null)
      {
           alert("O Aluno deve Possuir um Plano para Prosseguir!");
        return;
      }

      if(this.aluno.personalId == null)
      {
           alert("O Aluno deve Possuir um Personal para Prosseguir!");
        return;
      }



      if(this.modoEdicao == true)
      {
        this.editar();
      }
      else{
        this.adicionar();
      }

    }

    limparCampos(){
      this.aluno = new Aluno();
      this.listarCampos();
      this.modoEdicao = false;
      this.title= "Adicionar Aluno";
      this.atualizarLista.emit();
    }

  }



