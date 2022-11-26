import { InserirRecebimentoComponent } from './Recebimento/inserir-recebimento/inserir-recebimento.component';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { InserirAlunoComponent } from './Aluno/inserir-aluno/inserir-aluno.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InserirPersonalComponent } from './Personal/inserir-personal/inserir-personal.component';
import { InserirPagamentoComponent } from './Pagamento/inserir-pagamento/inserir-pagamento.component';
import { InserirPlanoComponent } from './Plano/inserir-plano/inserir-plano.component';
import { NgxMaskModule } from 'ngx-mask';
import localeDeAt from '@angular/common/locales/pt-PT';
import { RelatorioComponent } from './Relatorios/listar-relatorio/relatorio.component';
import { InserirDespesaComponent } from './Despesa/inserir-despesa/inserir-despesa.component';
import { ListarAlunosComponent } from './Aluno/listar-alunos/listar-alunos.component';
import { ListarPersonaisComponent } from './Personal/listar-personais/listar-personais.component';
import { ListarPagamentosComponent } from './Pagamento/listar-pagamentos/listar-pagamentos.component';
import { ListarDespesasComponent } from './Despesa/listar-despesas/listar-despesas.component';
import { ListarPlanosComponent } from './Plano/listar-planos/listar-planos.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { ListarRecebimentosComponent } from './Recebimento/listar-recebimentos/listar-recebimentos.component';
import { NgxPaginationModule} from 'ngx-pagination';

registerLocaleData(localeDeAt, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    ListarAlunosComponent,
    ListarPlanosComponent,
    ListarPersonaisComponent,
    ListarPagamentosComponent,
    ListarDespesasComponent,
    ListarRecebimentosComponent,
    InserirAlunoComponent,
    InserirPersonalComponent,
    InserirPagamentoComponent,
    InserirPlanoComponent,
    InserirDespesaComponent,
    InserirRecebimentoComponent,
    RelatorioComponent,
    PaginaInicialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt-BR'},
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
