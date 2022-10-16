import { Lancamento } from './../models/Lancamentos.model';
import { DespesaService } from './../services/despesa.service';
import { Pagamento } from './../models/Pagamento.model';
import { PagamentoService } from './../services/pagamento.service';
import { AlunoService } from './../services/aluno.service';
import { Component, OnInit } from '@angular/core';
import { Aluno } from '../models/Aluno.model';
import { Despesa } from '../models/Despesa.model';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  dataAtual : Date = new Date();
  mesAtual : number = new Date().getMonth()+1;
  anoAtual : number = new Date().getFullYear();
  pagamentos: Pagamento[] = [];
  despesas: Despesa[] = [];
  lancamentos: Lancamento[] = [];


  aPagar : number =0;

  caixaAtual: number=0;



  pagos : number = 0;
  planosPagos : number = 0;


  valorPersonalTotal : number = 0;


  valorDespesas: number =0;


  alunosCadastradosTotal? : number;
  alunosCadastradosMes : number = 0;

  constructor(private alunoService: AlunoService, private pagamentoService: PagamentoService, private despesaService: DespesaService) { }

  ngOnInit(): void {
    this.limparTudo();

}

listarPagamentosEDespesas(){
  this.pagamentoService.listar().subscribe((pagamentos : Pagamento[])=>
  {
    this.pagamentos = pagamentos;
    this.listarPagamentosRecebidos();
  });
  this.despesaService.listar().subscribe((despesas : Despesa[])=>
  {
    this.despesas = despesas;
    this.listarDespesas();
  });



}

aoAlterarData(){
this.dataAtual.setMonth(this.mesAtual-1);
this.dataAtual.setFullYear(this.anoAtual);
this.limparTudo();
}



limparTudo(){
  this.aPagar =0;
  this.alunosCadastradosMes=0;
  this.alunosCadastradosTotal=0;
  this.valorDespesas=0;
  this.pagos=0;
  this.planosPagos=0;
  this.valorPersonalTotal=0;
  this.lancamentos=[];
  this.caixaAtual =0 ;
  this.listarPagamentosEDespesas();
this.listarAlunosCadastrados();
}





listarPagamentosRecebidos(){
    this.pagamentos?.forEach((pagamento: Pagamento)=>{

this.caixaAtual += pagamento.valorTotal;


      if(new Date(pagamento.dataDoPagamento).getMonth() == this.dataAtual.getMonth()
      && new Date(pagamento.dataDoPagamento).getFullYear() == this.dataAtual.getFullYear())
      {
        this.pagos += pagamento.valorTotal;
        this.planosPagos += Number(pagamento.valorPlano);
        this.valorPersonalTotal += Number(pagamento.valorAdicionalPersonal);

      this.lancamentos?.push(
        new Lancamento(pagamento.valorTotal, pagamento.formaPagamento,
          "Pgt Aluno: "+ pagamento.aluno?.nome + " - " + pagamento.observacoes, pagamento.dataDoPagamento,"Crédito"));
        }

    })
}

listarAlunosCadastrados(){

this.alunoService.listar().subscribe((alunos: Aluno[])=>
{
  this.alunosCadastradosTotal = alunos.length;

  alunos.forEach((aluno:Aluno)=>{

    // VERIFICA REFERENTE AO CADASTRO DOS ALUNOS

    if(new Date(aluno.dataCadastro).getMonth() == this.dataAtual.getMonth()
    && new Date(aluno.dataCadastro).getFullYear() == this.dataAtual.getFullYear())
    {
      this.alunosCadastradosMes++;
    }

    // VERIFICA SE O ALUNO ESTÁ COM A MENSALIDADE VENCIDA
   if(aluno.statusMensalidade == "Vencido" && aluno.status != "Inativo")
   {
    this.aPagar+= Number(aluno.plano?.valor);
   }



  });

});
}


listarDespesas(){
  this.despesaService.listar().subscribe((despesas: Despesa[])=>{

    despesas.forEach((despesa: Despesa)=>
    {
      this.caixaAtual -= Number(despesa.valor);

      if(new Date(despesa.dataDoPagamento).getMonth() == this.dataAtual.getMonth()
      && new Date(despesa.dataDoPagamento).getFullYear() == this.dataAtual.getFullYear())
      {
        this.valorDespesas += Number(despesa.valor);
        this.lancamentos?.push(
          new Lancamento(-despesa.valor, despesa.formaPagamento,
            despesa.observacoes, despesa.dataDoPagamento, "Débito"));
      }

    });
    this.lancamentos.sort((a,b)=> new Date(a.data).getTime()- new Date(b.data).getTime())
  });

}


}

