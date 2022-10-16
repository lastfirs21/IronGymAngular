import { AlunoService } from './../services/aluno.service';
import { PagamentoService } from './../services/pagamento.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagamento } from '../models/Pagamento.model';
import { Aluno } from '../models/Aluno.model';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-inserir-pagamento',
  templateUrl: './inserir-pagamento.component.html',
  styleUrls: ['./inserir-pagamento.component.css']
})
export class InserirPagamentoComponent implements OnInit {

  eventEditSub: Subscription = new Subscription();
  eventExcludeSub: Subscription = new Subscription();

  @Input() eventEdit: Observable<Pagamento> = new Observable<Pagamento>();
  @Input() eventExclude: Observable<void> = new Observable<void>();
  @Input() eventAdd?: number;


  pagamento: Pagamento = new Pagamento();
  alunos : Aluno[] = [];
  avisoVencido: boolean = false;
  title : string = "Adicionar Pagamento";
  modoEdicao: boolean = false;
  @Output() atualizarLista: EventEmitter<any> = new EventEmitter();

  constructor(private pagamentoService: PagamentoService, private alunoService: AlunoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){
    if(Number(this.eventAdd) > 0)
    {
      this.preencher(Number(this.eventAdd));
    }
    else{
      this.preencher(0);
    }



    this.eventEditSub = this.eventEdit.subscribe((pagamento: Pagamento) =>
    {
      this.modoEdicao = true;
      this.title = "Editar Pagamento";
      this.pagamento= pagamento;
    } );


    this.eventExcludeSub = this.eventExclude.subscribe(()=>
    {
      this.limparCampos();
    })

    }


  alteraAluno(){
    this.preencher(Number(this.pagamento.alunoId));
  }

  recalcularTotal(){
    this.pagamento.valorTotal = Number(this.pagamento.aluno?.plano?.valor) -  Number(this.pagamento.desconto)
    + Number(this.pagamento.valorAdicionalPersonal);
  }

  adicionar(){
    this.pagamento.valorPlano = Number(this.pagamento.aluno?.plano?.valor);
    this.pagamentoService.adicionar(this.pagamento)
    .subscribe((resultado) =>
    {
    this.limparCampos();
    });
  }


    editar(){
      this.pagamento.valorPlano = Number(this.pagamento.aluno?.plano?.valor);
      this.pagamentoService.editar(this.pagamento).subscribe(
        (resultado) => {
          this.limparCampos();
        }
        );
    }

    submit(){

      if(this.pagamento.aluno?.plano == null)
        {
          alert("Defina um Plano Antes de Realizar o Pagamento");
          return;
        }

        if(new Date(this.pagamento.aluno?.vencimentoMensalidade).getTime() > new Date().getTime() && this.avisoVencido == false)
        {
          alert("A Mensalidade desse Aluno Ainda não Venceu, Deseja Realmente Adicionar um Novo Pagamento!");
          this.avisoVencido = true;
          return;
        }


        this.avisoVencido = false;

      if(this.modoEdicao == true)
      {
        this.editar();
      }
      else{
        this.adicionar();
      }
    }

    preencher(Id: number)
    {
        if(Id != 0)
        {
          this.alunoService.listar().subscribe((alunos: Aluno[])=>
          {
            this.alunos = alunos;
            this.pagamento.formaPagamento = "Dinheiro";
            this.pagamento.alunoId = Id;
            this.pagamento.aluno = alunos.find(a=>a.id == Id);
            this.pagamento.valorAdicionalPersonal = Number(this.pagamento.aluno?.personal?.valor);
            this.recalcularTotal();
          });
        }else{

          this.alunoService.listar().subscribe((alunos: Aluno[])=>
          {
            this.alunos = alunos;
            this.pagamento.formaPagamento = "Dinheiro";
            this.pagamento.alunoId = alunos[Id].id;
            this.pagamento.aluno = alunos[Id];
            this.pagamento.valorAdicionalPersonal = Number(this.pagamento.aluno?.personal?.valor);
            this.recalcularTotal();
          });
        }
    }


    limparCampos(){
      this.pagamento = new Pagamento();
      this.preencher(0);
      this.atualizarLista.emit();
      this.modoEdicao= false;
      this.avisoVencido = false;
      this.title = "Adicionar Pagamento"
    }


}
