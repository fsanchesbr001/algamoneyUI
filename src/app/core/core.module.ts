import { NgModule,LOCALE_ID } from '@angular/core';
import { CommonModule,DatePipe,registerLocaleData } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";

import localePt from '@angular/common/locales/pt';
import {ErrorHandlerService} from "./error-handler.service";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";
import {ConfirmationService, MessageService} from "primeng/api";
import {RouterModule} from "@angular/router";
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import {Title} from "@angular/platform-browser";
import {AuthService} from "../seguranca/auth.service";
import { AcessoNaoAutorizadoComponent } from './acesso-nao-autorizado/acesso-nao-autorizado.component';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent, AcessoNaoAutorizadoComponent],
  imports: [
    CommonModule,
    ToastModule,
    RouterModule,
    ConfirmDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [
    ErrorHandlerService,
    MessageService,
    ConfirmationService,
    TranslateService,
    Title,
    DatePipe,
    AuthService,
    {provide: LOCALE_ID,useValue:'pt-BR'}
  ]
})

export class CoreModule {}
