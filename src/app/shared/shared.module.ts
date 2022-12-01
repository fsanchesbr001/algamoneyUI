import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MessagesComponent} from "./messages/messages.component";
import {MessageModule} from "primeng/message";



@NgModule({
  declarations: [MessagesComponent],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [
    MessagesComponent
  ]
})
export class SharedModule { }
