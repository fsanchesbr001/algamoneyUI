import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  @Input() severidade:string = "";
  @Input() texto:string ="";
  @Input() componente:any;
  @Input() qualErro:string = "";

  temErro():boolean {
    return this.componente.hasError(this.qualErro) && this.componente.dirty;
  }
}
