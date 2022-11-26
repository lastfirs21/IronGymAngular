export class Personal {
  id?: number;
  nome: string;
  cpf : string;
  telefone: string;
  valor: number;

  constructor()
  {
    this.nome = "",
    this.cpf = "",
    this.telefone = "",
    this.valor = 0
  }
}
