export class Lancamento {
  valor: number | string;
  formaPagamento : string;
  descricao: string;
  data: Date;
  tipo: string;

  constructor(valor: number|string, formaPag: string, desc: string, data: Date, tipo: string)
  {
    this.valor= valor;
    this.formaPagamento = formaPag,
    this.descricao = desc,
    this.data = data,
    this.tipo = tipo
  }

}
