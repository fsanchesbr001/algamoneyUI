import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {SharedModule} from "../shared/shared.module";
import {InputTextModule} from "primeng/inputtext";


@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    SegurancaRoutingModule,
    FormsModule,
    ButtonModule,
    SharedModule,
    InputTextModule
  ]
})
export class SegurancaModule { }
