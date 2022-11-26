export class Recebimento {
  id?: number;
  valor: number | string;
  formaPagamento : string;
  observacoes: string;
  dataDoPagamento: Date;

  constructor()
  {
    this.valor= 0;
    this.formaPagamento = "",
    this.observacoes = "",
    this.dataDoPagamento = new Date()
  }
}
