import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {MoneyHttpInterceptor} from "./money-http-interceptor";
import {environment} from "../../environments/environment";

export function tokenGetter(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: environment.tokenAllowedDomains,
        disallowedRoutes: environment.tokenDisallowedRoutes
      }
    }),
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    ButtonModule,
    SharedModule,
    InputTextModule
  ],
  providers: [JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MoneyHttpInterceptor,
      multi: true
    }]
})


export class SegurancaModule {

}
