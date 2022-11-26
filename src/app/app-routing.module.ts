import { ListarRecebimentosComponent } from './Recebimento/listar-recebimentos/listar-recebimentos.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { RelatorioComponent } from './Relatorios/listar-relatorio/relatorio.component';
import { InserirPersonalComponent } from './Personal/inserir-personal/inserir-personal.component';
import { InserirPlanoComponent } from './Plano/inserir-plano/inserir-plano.component';
import { InserirPagamentoComponent } from './Pagamento/inserir-pagamento/inserir-pagamento.component';
import { InserirAlunoComponent } from './Aluno/inserir-aluno/inserir-aluno.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPlanosComponent } from './Plano/listar-planos/listar-planos.component';
import { ListarAlunosComponent } from './Aluno/listar-alunos/listar-alunos.component';
import { ListarPersonaisComponent } from './Personal/listar-personais/listar-personais.component';
import { ListarPagamentosComponent } from './Pagamento/listar-pagamentos/listar-pagamentos.component';
import { ListarDespesasComponent } from './Despesa/listar-despesas/listar-despesas.component';

export const routes: Routes = [
  {path: '', redirectTo: 'pagina-inicial', pathMatch: 'full'},
  {path: 'listar-alunos', component: ListarAlunosComponent},
  {path: 'listar-planos', component: ListarPlanosComponent},
  {path: 'listar-personais', component: ListarPersonaisComponent},
  {path: 'listar-despesas', component: ListarDespesasComponent},
  {path: 'listar-recebimentos', component: ListarRecebimentosComponent},
  {path: 'listar-pagamentos/:ID', component: ListarPagamentosComponent},
  {path: 'listar-pagamentos', component: ListarPagamentosComponent},
  {path: 'relatorio', component: RelatorioComponent},
  {path: 'pagina-inicial', component: PaginaInicialComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
