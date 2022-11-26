import { Lancamento } from '../Lancamentos.model';

export interface Relatorio {
  lancamentos: Lancamento[];
  usuariosCadastrados: number;
  usuariosInativos: number;
  cadastrosMes: number;
  aReceber: number;
  total: number;
  totalPlanos: number;
  totalPersonal: number;
  totalRecebimentos: number;
  totalDespesas: number;
  totalDescontos: number;
  balancoMensal: number;
  balancoTotal: number;
  caixaAtual: number;
}
