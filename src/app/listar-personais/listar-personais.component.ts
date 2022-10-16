import { Router } from '@angular/router';
import { PersonalService } from './../services/personal.service';
import { Component, OnInit } from '@angular/core';
import { Personal } from '../models/Personal.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-listar-personais',
  templateUrl: './listar-personais.component.html',
  styleUrls: ['./listar-personais.component.css']
})
export class ListarPersonaisComponent implements OnInit {

  eventsSubject: Subject<Personal> = new Subject<Personal>();
  personais : Personal[] = [];
  modoEdicao: boolean= false;
  validaeExclusao: boolean = false;

  constructor(private personalService : PersonalService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.personalService.listar().subscribe((personais: Personal[])=>{
      this.personais = personais;
    });
  }

  adcionar()
  {
    this.modoEdicao = false;
    this.listar();
  }


  editar(personal: Personal)
  {
    this.modoEdicao = true;
    this.eventsSubject.next(personal);
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
    this.personalService.excluir(id).subscribe(data => {
      this.listar();
    });
  }
  }

}
