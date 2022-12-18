import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {LancamentosModule} from "./lancamentos/lancamentos.module";
import {PessoasModule} from "./pessoas/pessoas.module";
import {CoreModule} from "./core/core.module";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {RouterModule, Routes} from "@angular/router";
import {LancamentosPesquisaComponent} from "./lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component";
import {PessoasPesquisaComponent} from "./pessoas/pessoas-pesquisa/pessoas-pesquisa.component";
import {LancamentoCadastroComponent} from "./lancamentos/lancamento-cadastro/lancamento-cadastro.component";


export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const routes:Routes=[
  {path:'lancamentos', component:LancamentosPesquisaComponent},
  {path:'lancamentos/novo', component:LancamentoCadastroComponent},
  {path:'pessoas', component:PessoasPesquisaComponent}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
