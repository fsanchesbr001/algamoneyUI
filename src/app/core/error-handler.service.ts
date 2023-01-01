import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService:MessageService) { }

  handle(errorResponse:any){
    let msg:string='';
    if(typeof errorResponse==='string'){
      msg = errorResponse;
    }
    else if (errorResponse instanceof HttpErrorResponse && errorResponse.status>=400
      && errorResponse.status<=499){
      try {
        msg = errorResponse.error[0].mensagemUsuario;
      }
      catch (e) {
        console.error('Ocorreu um erro', errorResponse);
        msg='Erro nao identificado';
      }
    }
    else{
      msg='Erro ao processar chamada remota. Tente novamente';
      console.log('Ocorreu um erro:', errorResponse);
    }
    this.messageService.add({severity:'error',detail:`${msg}`
      ,closable:true,life:3000});
  }
}
