import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { InserirPersonalComponent } from './inserir-personal/inserir-personal.component';
import { InserirPlanoComponent } from './inserir-plano/inserir-plano.component';
import { InserirPagamentoComponent } from './inserir-pagamento/inserir-pagamento.component';
import { InserirAlunoComponent } from './inserir-aluno/inserir-aluno.component';
import { ListarPagamentosComponent } from './listar-pagamentos/listar-pagamentos.component';
import { ListarPersonaisComponent } from './listar-personais/listar-personais.component';
import { ListarPlanosComponent } from './listar-planos/listar-planos.component';
import { ListarAlunosComponent } from './listar-alunos/listar-alunos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'relatorio', pathMatch: 'full'},
  {path: 'listar-alunos', component: ListarAlunosComponent},
  {path: 'listar-planos', component: ListarPlanosComponent},
  {path: 'listar-personais', component: ListarPersonaisComponent},
  {path: 'listar-despesas', component: ListarDespesasComponent},
  {path: 'listar-pagamentos/:ID', component: ListarPagamentosComponent},
  {path: 'listar-pagamentos', component: ListarPagamentosComponent},
  {path: 'relatorio', component: RelatorioComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
