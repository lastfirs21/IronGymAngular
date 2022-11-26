import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PlanoService } from '../services-plano/plano.service';
import { Plano } from '../Plano.model';

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

  page: number = 1;
  pageSize: number =10;
  totalPages: number=0;

  constructor(private planoService: PlanoService, private router: Router) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(){
    this.planoService.listar().subscribe((planos: Plano[])=>{
      this.planos = planos;
      this.totalPages =  parseInt((this.planos.length/this.pageSize+1).toString());
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
    this.modoEdicao = false;
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
