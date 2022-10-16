import { Aluno } from "./Aluno.model";

export class Pagamento {
  id?: number;
  alunoId?: number;
  aluno?: Aluno;
  valorTotal : number;
  desconto :number | string;
  valorAdicionalPersonal: number | string;
  valorPlano: number | string;
  formaPagamento: string;
  observacoes: string;
  dataDoPagamento: Date;


  constructor()
  {
    this.alunoId=0;
    this.valorTotal=0;
    this.desconto= 0;
    this.valorAdicionalPersonal = 0;
    this.formaPagamento = "";
    this.observacoes = "";
    this.dataDoPagamento = new Date();
    this.valorPlano = 0;
  }
}
