import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Despesa } from '../Despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private url =  'http://localhost:81/despesa'
  //private url =  'https://localhost:5001/despesa'

  constructor(private httpClient: HttpClient) {
  }


  listar() : Observable<Despesa[]> {
    return this.httpClient.get<Despesa[]>(this.url);
   }

   excluir(id :any)  {
    console.log(id);
    return this.httpClient.delete(this.url+"/"+id);
   }

   editar(despesa: Despesa)
   {
    console.log(despesa);
    return this.httpClient.put(this.url+"/"+despesa.id, despesa);
   }

  adicionar(despesa: Despesa): Observable<Despesa> {
    console.log(despesa);
    return this.httpClient.post<Despesa>(this.url, despesa);
  }

  buscarPorId(id : number | string)
  {
    return this.httpClient.get<Despesa>(this.url+"/"+id);
  }
}
