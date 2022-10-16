
export class Plano {
  id?: number;
  descricao : string;
  valor :number| string;
  mesesPlano: number;


  constructor()
  {
    this.descricao = "";
    this.valor = 0;
    this.mesesPlano = 0;
  }
}
