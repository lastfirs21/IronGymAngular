import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recebimento } from '../Recebimento.model';

@Injectable({
  providedIn: 'root'
})
export class RecebimentoService {

  private url =  'http://localhost:81/recebimento'
  //private url =  'https://localhost:5001/recebimento'

  constructor(private httpClient: HttpClient) {
  }


  listar() : Observable<Recebimento[]> {
    return this.httpClient.get<Recebimento[]>(this.url);
   }

   excluir(id :any)  {
    console.log(id);
    return this.httpClient.delete(this.url+"/"+id);
   }

   editar(recebimento: Recebimento)
   {
    console.log(recebimento);
    return this.httpClient.put(this.url+"/"+recebimento.id, recebimento);
   }

  adicionar(recebimento: Recebimento): Observable<Recebimento> {
    console.log(recebimento);
    return this.httpClient.post<Recebimento>(this.url, recebimento);
  }

  buscarPorId(id : number | string)
  {
    return this.httpClient.get<Recebimento>(this.url+"/"+id);
  }
}
