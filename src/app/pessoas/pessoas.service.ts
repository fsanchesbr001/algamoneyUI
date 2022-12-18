import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {PessoasFiltro} from "./pessoas-filtro";
import {Pessoa} from "../core/modelos/pessoa";

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

  excluir(codigo:number):Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`,
      {headers},).toPromise()
      .then(()=>null);
  }

  mudarStatus(codigo:number, status:boolean):Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu')
      .append('Content-Type','application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`,status,
      {headers}).toPromise()
      .then(()=>null);
  }

  pesquisarTodos():Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return this.http.get(`${this.pessoasUrl}`,{headers}).toPromise()
      .then((response:any)=>{return response});
  }

  adicionar(pessoa: Pessoa):Promise<any> {
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu')
      .append('Content-Type','application/json');

    return this.http.post<Pessoa>(this.pessoasUrl,pessoa,
      {headers}).toPromise();
  }
}
