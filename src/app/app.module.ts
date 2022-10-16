import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localePt from '@angular/common/locales/pt'
import { ListarAlunosComponent } from './listar-alunos/listar-alunos.component';
import { ListarPlanosComponent } from './listar-planos/listar-planos.component';
import { ListarPersonaisComponent } from './listar-personais/listar-personais.component';
import { ListarPagamentosComponent } from './listar-pagamentos/listar-pagamentos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { InserirAlunoComponent } from './inserir-aluno/inserir-aluno.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InserirPersonalComponent } from './inserir-personal/inserir-personal.component';
import { InserirPagamentoComponent } from './inserir-pagamento/inserir-pagamento.component';
import { InserirPlanoComponent } from './inserir-plano/inserir-plano.component';
import { NgxMaskModule } from 'ngx-mask';
import localeDeAt from '@angular/common/locales/pt-PT';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { InserirDespesaComponent } from './inserir-despesa/inserir-despesa.component';
import { ListarDespesasComponent } from './listar-despesas/listar-despesas.component'
registerLocaleData(localeDeAt, 'pt')

@NgModule({
  declarations: [
    AppComponent,
    ListarAlunosComponent,
    ListarPlanosComponent,
    ListarPersonaisComponent,
    ListarPagamentosComponent,
    InserirAlunoComponent,
    InserirPersonalComponent,
    InserirPagamentoComponent,
    InserirPlanoComponent,
    RelatorioComponent,
    InserirDespesaComponent,
    ListarDespesasComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [ {provide: LOCALE_ID, useValue: 'pt-BR'},
  {
    provide: DEFAULT_CURRENCY_CODE,
    useValue: 'BRL'
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
