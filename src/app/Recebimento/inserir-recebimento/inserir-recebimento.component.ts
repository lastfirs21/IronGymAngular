import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Recebimento } from '../Recebimento.model';
import { RecebimentoService } from '../services-recebimento/recebimento-service.service';

@Component({
  selector: 'app-inserir-recebimento',
  templateUrl: './inserir-recebimento.component.html',
  styleUrls: ['./inserir-recebimento.component.css']
})
export class InserirRecebimentoComponent implements OnInit {

  recebimento: Recebimento = new Recebimento();
  errorMessage: string = "";
  modoEdicao: boolean = false;
  @Output() atualizarLista: EventEmitter<any> = new EventEmitter();
  title: string= "Adicionar Recebimento";

  eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<Recebimento> = new Observable<Recebimento>();


  constructor(private recebimentoService: RecebimentoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){


    this.eventsSubscription = this.events.subscribe((plano: Recebimento) =>
    {
      this.modoEdicao = true;
      this.recebimento = plano;
      this.title = "Editar Recebimento";
    } );
    this.recebimento.formaPagamento = "Dinheiro";
    this.recebimento.dataDoPagamento = new Date();
  }

  dataChanged(eventDate: any): Date {
    return new Date(eventDate);
  }


  preencherCampos(id: any)
  {
    this.recebimentoService.buscarPorId(id).subscribe((recebimento:Recebimento)=>
    {
      this.recebimento = recebimento;
    });
  }


  editar(){
    this.recebimentoService.editar(this.recebimento).subscribe((resultado)=>
    {
      this.limparCampos();
    });

  }


  adicionar(){
    console.log(this.recebimento);
    this.recebimentoService.adicionar(this.recebimento).subscribe(
      (resultado) => {
        this.atualizarLista.emit();
        this.limparCampos();
      }
      );
    }

    submit(){

    if(this.recebimento.observacoes.length <4)
    {this.errorMessage="O Campo Observações deve Conter Mais de 4 Caracteres!"
  return;}

  if(this.recebimento.valor <=0)
  {this.errorMessage="O Campo Valor deve Ser Maior que 0!"
return;}



      if(this.modoEdicao == true)
      {
        this.editar();
      }
      else{
        this.adicionar();
      }


    }

    limparCampos(){
      this.recebimento = new Recebimento();
      this.modoEdicao = false;
      this.atualizarLista.emit();
      this.title = "Adicionar Recebimento";
      this.recebimento.formaPagamento = "Dinheiro";
      this.errorMessage = "";
  }

}
