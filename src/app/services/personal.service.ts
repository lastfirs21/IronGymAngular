import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personal } from '../models/Personal.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private url =  'http://localhost:80/personal'
 // private url =  'https://localhost:5001/personal'

  constructor(private httpClient: HttpClient) {
  }




  listar() : Observable<Personal[]> {
    return this.httpClient.get<Personal[]>(this.url);
   }

   excluir(id :any)  {
    console.log(id);
    return this.httpClient.delete(this.url+"/"+id);
   }

   editar(personal: Personal)
   {
    console.log(personal);
    return this.httpClient.put(this.url+"/"+personal.id, personal);
   }

  adicionar(personal: Personal): Observable<Personal> {
    return this.httpClient.post<Personal>(this.url, personal);
  }

  buscarPorId(id : number | string)
  {
    return this.httpClient.get<Personal>(this.url+"/"+id);
  }
}
