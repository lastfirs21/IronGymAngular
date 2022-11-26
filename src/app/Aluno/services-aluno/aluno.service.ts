import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aluno } from '../Aluno.model';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  //private url =  'http://localhost:81/aluno'
  private url =  'https://localhost:5001/aluno'

  constructor(private httpClient: HttpClient) {
  }


   listar(nome?: string) : Observable<Aluno[]> {

    return this.httpClient.get<Aluno[]>(this.url+"?nome="+nome);
   }

   excluir(id :any)  {
    return this.httpClient.delete(this.url+"/"+id);
   }

   editar(aluno: Aluno)
   {
    return this.httpClient.put(this.url+"/"+aluno.id, aluno);
   }


  adicionar(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.url, aluno);
  }

  buscarPorId(id : number | string)
  {
    return this.httpClient.get<Aluno>(this.url+"/"+id);
  }
}
