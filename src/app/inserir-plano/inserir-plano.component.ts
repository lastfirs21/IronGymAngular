import { PlanoService } from './../services/plano.service';
import { Plano } from './../models/Plano.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-inserir-plano',
  templateUrl: './inserir-plano.component.html',
  styleUrls: ['./inserir-plano.component.css']
})
export class InserirPlanoComponent implements OnInit {

  plano: Plano = new Plano();
  modoEdicao: boolean = false;
  title: string = "Adicionar Plano";
  @Output() atualizarLista: EventEmitter<any> = new EventEmitter();
  eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<Plano> = new Observable<Plano>();





  constructor(private planoService: PlanoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){

    this.eventsSubscription = this.events.subscribe((plano: Plano) =>
    {
      this.modoEdicao = true;
      this.plano = plano;
      this.title = "Editar Plano";
    } );
  }


  preencherCampos(id: any)
  {
    this.planoService.buscarPorId(id).subscribe((plano:Plano)=>
    {
      this.plano = plano;
    })
  }

  adicionar(){

      this.planoService.adicionar(this.plano).subscribe(
        (resultado) => {
          this.limparCampos();
        }
        );

    }

    editar(){

        this.planoService.editar(this.plano).subscribe((resultado)=>
        {
        this.limparCampos();
      })

    }



    submit()
    {

      if(this.plano.descricao.length < 4)
      {
        alert("O Campo Descrição deve Ter Pelo Menos 4 Caracteres!");
        return;
      }
      if(this.plano.valor <= 0)
      {
        alert("O Campo Valor deve Ser Maior que 0 !");
        return;
      }
      if(this.plano.mesesPlano <= 0)
      {
        alert("A Quantidade de Meses deve Ser Maior que 0 !");
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
      this.plano = new Plano();
      this.modoEdicao = false;
      this.title = "Adicionar Plano";
      this.atualizarLista.emit();
  }

}
