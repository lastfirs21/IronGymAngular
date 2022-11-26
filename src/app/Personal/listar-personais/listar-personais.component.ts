import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Personal } from '../Personal.model';
import { PersonalService } from '../services-personal/personal.service';

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



  page: number = 1;
  pageSize: number =10;
  totalPages: number=0;

  constructor(private personalService : PersonalService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.personalService.listar().subscribe((personais: Personal[])=>{
      this.personais = personais;
      this.totalPages =  parseInt((this.personais.length/this.pageSize+1).toString());

    });
    this.page=1;
  }

  nextPage(){
    console.log(this.totalPages);
    if(this.page == this.totalPages)
    {
      return;
    }
    else{
      this.page++;
    }
  }

  previousPage(){
    if(this.page==1)
    {
      return;
    }
    this.page--;
  }



  adcionar()
  {
    this.modoEdicao = false;
    this.listar();
  }

  desEdit(){
    this.modoEdicao= false;
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
