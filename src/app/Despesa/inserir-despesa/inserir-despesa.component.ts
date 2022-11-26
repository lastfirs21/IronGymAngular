import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Despesa } from '../Despesa.model';
import { DespesaService } from '../services-despesa/despesa.service';

@Component({
  selector: 'app-inserir-despesa',
  templateUrl: './inserir-despesa.component.html',
  styleUrls: ['./inserir-despesa.component.css']
})
export class InserirDespesaComponent implements OnInit {

  despesa: Despesa = new Despesa();
  errorMessage: string = "";
  modoEdicao: boolean = false;
  @Output() atualizarLista: EventEmitter<any> = new EventEmitter();
  title: string= "Adicionar Despesa";

  eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<Despesa> = new Observable<Despesa>();


  constructor(private despesaService: DespesaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){


    this.eventsSubscription = this.events.subscribe((plano: Despesa) =>
    {
      this.modoEdicao = true;
      this.despesa = plano;
      this.title = "Editar Despesa";
    } );
    this.despesa.formaPagamento = "Dinheiro";
    this.despesa.dataDoPagamento = new Date();
  }

  dataChanged(eventDate: any): Date {
    return new Date(eventDate);
  }


  preencherCampos(id: any)
  {
    this.despesaService.buscarPorId(id).subscribe((despesa:Despesa)=>
    {
      this.despesa = despesa;
    });
  }


  editar(){
    this.despesaService.editar(this.despesa).subscribe((resultado)=>
    {
      this.limparCampos();
    });

  }


  adicionar(){
    console.log(this.despesa);
    this.despesaService.adicionar(this.despesa).subscribe(
      (resultado) => {
        this.atualizarLista.emit();
        this.limparCampos();
      }
      );
    }

    submit(){

    if(this.despesa.observacoes.length <4)
    {this.errorMessage="O Campo Observações deve Conter Mais de 4 Caracteres!"
  return;}

  if(this.despesa.valor <=0)
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
      this.despesa = new Despesa();
      this.modoEdicao = false;
      this.atualizarLista.emit();
      this.title = "Adicionar Despesa";
      this.despesa.formaPagamento = "Dinheiro";
      this.errorMessage = "";
  }

}
