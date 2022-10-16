import { Router } from '@angular/router';
import { PlanoService } from './../services/plano.service';
import { Component, OnInit } from '@angular/core';
import { Plano } from '../models/Plano.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listar-planos',
  templateUrl: './listar-planos.component.html',
  styleUrls: ['./listar-planos.component.css']
})
export class ListarPlanosComponent implements OnInit {

  eventsSubject: Subject<Plano> = new Subject<Plano>();
  planos : Plano[]= [];
  modoEdicao: boolean= false;
  validaeExclusao: boolean = false;

  constructor(private planoService: PlanoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.planoService.listar().subscribe((planos: Plano[])=>{
      this.planos = planos;
    });
  }

  adcionar()
  {
    this.modoEdicao = false;
    this.listar();
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
    this.planoService.excluir(id).subscribe(data => {
      this.listar();
    });}
  }



  editar(plano: Plano)
  {
    this.modoEdicao = true;
    this.eventsSubject.next(plano);
  }

}
