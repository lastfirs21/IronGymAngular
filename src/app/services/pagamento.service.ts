import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagamento } from '../models/Pagamento.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private url =  'http://localhost:80/pagamento'
 // private url =  'https://localhost:5001/pagamento'

  constructor(private httpClient: HttpClient) {
  }



  listar() : Observable<Pagamento[]> {
    return this.httpClient.get<Pagamento[]>(this.url);
   }

   excluir(id :any)  {
    return this.httpClient.delete(this.url+"/"+id);
   }


  adicionar(pagamento: Pagamento): Observable<Pagamento> {
    return this.httpClient.post<Pagamento>(this.url, pagamento);
  }

  editar(pagamento: Pagamento)
  {
   return this.httpClient.put(this.url+"/"+pagamento.id, pagamento);
  }

  buscarPorId(id : number | string)
  {
    return this.httpClient.get<Pagamento>(this.url+"/"+id);
  }
}
