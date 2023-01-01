import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    }),
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    ButtonModule,
    SharedModule,
    InputTextModule
  ],
  providers: [JwtHelperService]
})
export class SegurancaModule { }
