import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NotAuthenticatedError} from "../seguranca/money-http-interceptor";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService:MessageService,
              private route:Router) { }

  handle(errorResponse:any){
    let msg:string='';
    if(typeof errorResponse==='string'){
      msg = errorResponse;
    }
    else if (errorResponse instanceof HttpErrorResponse && errorResponse.status>=400
      && errorResponse.status<=499){
      try {
        msg = errorResponse.message;
        if(errorResponse.status===403){
          msg = 'Você não tem permissão para executar esta ação';
        }
      }
      catch (e) {
        console.error('Ocorreu um erro', errorResponse);
        msg='Erro nao identificado';
      }
    }
    else if(errorResponse instanceof NotAuthenticatedError){
      msg='Sua Sessão expirou, favor logar novamente';
      this.route.navigate(['/login']);
    }
    else{
      msg='Erro ao processar chamada remota. Tente novamente';
      console.log('Ocorreu um erro:', errorResponse);
    }
    this.messageService.add({severity:'error',detail:`${msg}`
      ,closable:true,life:3000});
  }
}
