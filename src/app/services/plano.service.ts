import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plano } from '../models/Plano.model';
@Injectable({
  providedIn: 'root'
})
export class PlanoService {
  private url =  'http://localhost:80/plano'
  //private url =  'https://localhost:5001/plano';

  constructor(private httpClient: HttpClient) {
  }




  listar() : Observable<Plano[]> {
    return this.httpClient.get<Plano[]>(this.url);
   }

   excluir(id :any)  {
    console.log(id);
    return this.httpClient.delete(this.url+"/"+id);
   }

   editar(plano: Plano)
   {
    return this.httpClient.put(this.url+"/"+plano.id, plano);
   }

  adicionar(plano: Plano): Observable<Plano> {
    return this.httpClient.post<Plano>(this.url, plano);
  }

  buscarPorId(id : number | string)
  {
    return this.httpClient.get<Plano>(this.url+"/"+id);
  }

}
