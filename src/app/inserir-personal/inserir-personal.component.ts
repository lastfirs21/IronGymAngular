import { PersonalService } from './../services/personal.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Personal } from '../models/Personal.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-inserir-personal',
  templateUrl: './inserir-personal.component.html',
  styleUrls: ['./inserir-personal.component.css']
})
export class InserirPersonalComponent implements OnInit {
  personal: Personal = new Personal();
  modoEdicao: boolean = false;
  @Output() atualizarLista: EventEmitter<any> = new EventEmitter();
  title: string= "Adicionar Personal";

  eventsSubscription: Subscription = new Subscription();
  @Input() events: Observable<Personal> = new Observable<Personal>();


  constructor(private personalService: PersonalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(){

    this.eventsSubscription = this.events.subscribe((plano: Personal) =>
    {
      this.modoEdicao = true;
      this.personal = plano;
      this.title = "Editar Personal";
    } );
  }


  preencherCampos(id: any)
  {
    this.personalService.buscarPorId(id).subscribe((personal:Personal)=>
    {
      this.personal = personal;
    });
  }


  editar(){
    this.personalService.editar(this.personal).subscribe((resultado)=>
    {
      this.limparCampos();
    });

  }


  adicionar(){
    this.personalService.adicionar(this.personal).subscribe(
      (resultado) => {
        this.limparCampos();
      }
      );
    }

    submit(){

      if(this.personal.nome.length < 4)
      {
        alert("O Campo Nome deve Ter Pelo Menos 4 Caracteres!");
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
      this.personal = new Personal();
      this.modoEdicao = false;
      this.atualizarLista.emit();
      this.title = "Adicionar Personal";
  }
}
