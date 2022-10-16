import { Personal } from "./Personal.model";
import { Plano } from "./Plano.model";

export class Aluno {
  id?: number;
  nome: string;
  cpf : string;
  rg :string;
  telefone: string;
  dataNasc: Date;
  vencimentoMensalidade: Date;
  dataCadastro: Date;
  personalId?: number;
  planoId?: number;
  plano?: Plano;
  personal?: Personal;
  statusMensalidade?: string;
  status?: string;

  constructor()
  {
    this.nome = "",
    this.cpf = "",
    this.rg = "",
    this.telefone = "",
    this.personalId = 0;
    this.planoId=0;
    this.dataNasc = new Date(),
    this.dataCadastro = new Date(),
    this.vencimentoMensalidade = new Date()
  }
}
