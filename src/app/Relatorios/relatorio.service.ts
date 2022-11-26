import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Relatorio } from './listar-relatorio/Relatorio.model';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  //private url =  'http://localhost:81/relatorio'
  private url =  'https://localhost:5001/relatorio'

  constructor(private httpClient: HttpClient) {
  }

  listar(dataInicio :Date , dataFim: Date)
  {
    var datas= [];
    datas.push(dataInicio);
    datas.push(dataFim);
    return this.httpClient.post<Relatorio>(this.url, datas);
  }

}
