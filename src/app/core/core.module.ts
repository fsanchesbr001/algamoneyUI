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

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    ToastModule,
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
    DatePipe,
    {provide: LOCALE_ID,useValue:'pt-BR'}
  ]
})

export class CoreModule {}
