import { PlanoService } from '../../Plano/services-plano/plano.service';
import { AlunoService } from '../services-aluno/aluno.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Aluno } from '../Aluno.model';
import { Personal } from '../../Personal/Personal.model';
import { Plano } from '../../Plano/Plano.model';
import { debounce, debounceTime, elementAt, Observable, Subscription } from 'rxjs';
import { PersonalService } from 'src/app/Personal/services-personal/personal.service';

@Component({
  selector: 'app-inserir-aluno',
  templateUrl: './inserir-aluno.component.html',
  styleUrls: ['./inserir-aluno.component.css']
})


export class InserirAlunoComponent implements OnInit {

  eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<Aluno> = new Observable<Aluno>();

  errorMessage: string="";
  aluno: Aluno = new Aluno();
  telCadastrado?: Aluno;
  title: string= "Inserir Aluno";
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
        this.aluno.planoId = this.planos.filter(t=>t.descricao.includes("Plano Mensal 5"))[0].id; // caso o plano ou personal tenha sido excluido
      }
      if(aluno.personal == null)
      {
        this.aluno.personalId = this.personais.filter(t=>t.nome.includes("Sem Personal"))[0].id;
      }
      this.title= "Editar Aluno";
    } );
         this.listarCampos();
  }


  listarCampos(){

    this.personalService.listar().subscribe((personais: Personal[])=> {
      this.personais = personais;
      this.aluno.personalId = this.personais.filter(t=>t.nome.includes("Sem Personal"))[0].id;
    });

    this.planoService.listar().subscribe((planos: Plano[])=> {
      this.planos = planos;
      this.aluno.planoId = this.planos.filter(t=>t.descricao.includes("Plano Mensal 5"))[0].id;
    })

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

    verificaTelefone(){
      this.alunoService.listar().pipe(debounceTime(5000))
      .subscribe((alunos: Aluno[])=>{
        this.telCadastrado = alunos.find(a=>a.telefone == this.aluno.telefone);
        console.log(this.telCadastrado);
        });

    }


    submit(){

      if(this.aluno.nome.length < 4)
      {
       this.errorMessage = "O Campo Nome deve Ter Pelo Menos 4 Caracteres!";
        return;
      }
      if(this.aluno.telefone.length < 4)
      {
        console.log(this.aluno.telefone.length);
        this.errorMessage= "O Campo Telefone deve Ser Preenchido!";
        return;
      }

      if(this.planos.length == 0)
      {
       this.errorMessage= "Cadastre um Plano para Prosseguir!";
        return;
      }

      if(this.personais.length == 0)
      {
        this.errorMessage="Cadastre um Personal para Prosseguir!";
        return;
      }

      if(this.aluno.planoId == null)
      {
           this.errorMessage="O Aluno deve Possuir um Plano para Prosseguir!";
        return;
      }

      if(this.aluno.personalId == null)
      {
           this.errorMessage="O Aluno deve Possuir um Personal para Prosseguir!";
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
      this.verificaTelefone();
      this.modoEdicao = false;
      this.title= "Inserir Aluno";
      this.atualizarLista.emit();
      this.errorMessage= "";
    }

  }



