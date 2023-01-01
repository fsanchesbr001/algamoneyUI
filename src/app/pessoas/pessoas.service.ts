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
    params = params.set('page',filro.pagina);
    params = params.set('size',filro.itensPorPagina);

    if (filro.nome){
      params = params.set('nome',filro.nome);
    }

   return this.http.get(`${this.pessoasUrl}?filtrar`,{params}).toPromise()
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

    return this.http.delete(`${this.pessoasUrl}/${codigo}`).toPromise()
      .then(()=>null);
  }

  mudarStatus(codigo:number, status:boolean):Promise<any>{
    const headers = new HttpHeaders()
      .append('Content-Type','application/json');

    return this.http.put<void>(`${this.pessoasUrl}/${codigo}/ativo`,status,
      {headers}).toPromise();
  }

  pesquisarTodos():Promise<any>{
    return this.http.get(`${this.pessoasUrl}`).toPromise()
      .then((response:any)=>{return response});
  }

  adicionar(pessoa: Pessoa):Promise<any> {
    return this.http.post<Pessoa>(this.pessoasUrl,pessoa).toPromise();
  }

  buscarPorCodigo(codigo: number):Promise<any>{
    return this.http.get(`${this.pessoasUrl}/${codigo}`).toPromise()
      .then((response:any)=>{
        return response;
      });
  }

  atualizar(pessoa:Pessoa):Promise<any>{
    return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.codigo}`,pessoa).toPromise();

  }
}
