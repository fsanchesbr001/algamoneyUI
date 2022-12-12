import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PessoasFiltro} from "./pessoas-filtro";

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http:HttpClient) { }

  pesquisar(filro:PessoasFiltro):Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    params = params.set('page',filro.pagina);
    params = params.set('size',filro.itensPorPagina);

    if (filro.nome){
      params = params.set('nome',filro.nome);
    }

   return this.http.get(`${this.pessoasUrl}?filtrar`,{headers,params}).toPromise()
     .then((response:any)=>{
       const pessoas = response['content'];
       const resultado = {
        pessoas,
         total:response['totalElements']
       };
       console.log(resultado);
       return resultado;
     });

  }

  pesquisarTodos():Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return this.http.get(`${this.pessoasUrl}`,{headers}).toPromise()
      .then((response:any)=>{
        const pessoas = response['content'];
        const resultado = {
          pessoas};
        return resultado;
      });
  }
}