import { Lancamento } from './../Lancamentos.model';
import { Relatorio } from './Relatorio.model';
import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  dataInicio : Date= new Date();
  dataFim: Date = new Date();
  caixaAtual: number=0;
  relatorio?: Relatorio;
  lancamentos: Lancamento[]= [];



  page: number = 1;
  pageSize: number =10;
  totalPages: number=0;


  constructor(private relatorioService: RelatorioService) { }

  ngOnInit() {
    this.dataInicio.setDate(1); // define dia 1 como dia inicial
    if ((this.dataFim.getMonth()-1) < 0) // caso tenha passado o ano
    {
      this.dataInicio.setMonth(11);// volta pro mes anterior
      this.dataInicio.setFullYear(this.dataFim.getFullYear()-1) // volta pro ano anterior
    }
    else{
      this.dataInicio.setMonth((this.dataFim.getMonth()-1));
    }
    this.buscarPeriodo();
}


buscarPeriodo(){
  this.relatorioService.listar(this.dataInicio, this.dataFim).subscribe((relatorio: Relatorio)=>{
    this.relatorio = relatorio;
    this.totalPages =  parseInt((this.relatorio.lancamentos.length/this.pageSize+1).toString());

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


relatorioTotal(){
  alert("Relatório do Período: \nTotal de Recebidos: "+ this.relatorio?.total + " - "
  + "\nTotal de Despesas: " + this.relatorio?.totalDespesas + "\n\nBalanço Período: " + this.relatorio?.balancoMensal);
}

relatorioFechamento(){
  alert("Fechamento do Período: \nTotal de Recebidos: "+ this.relatorio?.total + " + "
  + "\nTotal de a Receber: " + this.relatorio?.aReceber + " + "
  + "\nCaixa Atual: " + this.relatorio?.caixaAtual.toFixed(2) + " - "
  + "\nTotal de Despesas: " + this.relatorio?.totalDespesas+


  "\n\nBalanço Fechamento: " + this.relatorio?.balancoTotal.toFixed(2));
}

descontos(){
  alert("Descontos Aplicados aos Pagamentos de Alunos! \n (Não Somam nas Despesas, Apenas Desconta do Recebimento de Planos)");
}

planos(){

alert("Valor Total de Planos Recebidos no Período!");

}

recebimentos(){
  alert("Valor Total de Recebimentos no Período!, (Não Inclui Planos e Personais)");

}

despesas(){
  alert("Valor Total de Despesas no Período!");
}

personais(){
  alert("Valor Total de Personais Recebidos no Período!");
}

aReceber(){
  alert("Planos a Receber, (Não inclui alunos Inativos)");
}

recebido(){
  alert("Todos os recebimentos no Período!");
}

}

