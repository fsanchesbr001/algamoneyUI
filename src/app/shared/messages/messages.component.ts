import {Component, Input} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  @Input() severidade:string = "";
  @Input() texto:string ="";
  @Input() componente?:AbstractControl | FormControl | null;
  @Input() qualErro:string = "";

  temErro():boolean {
    return this.componente ? this.componente.hasError(this.qualErro) && this.componente.dirty:true;
  }
}
