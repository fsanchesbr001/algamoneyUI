import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {LancamentoFiltro} from "./lancamento-filtro";
import { DatePipe } from '@angular/common';
import {Lancamento} from "../core/modelos/lancamento";

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosUrl = 'http://localhost:8080/lancamentos';

  private datePipe = new DatePipe('pt-BR');

  constructor(private http: HttpClient) { }

  pesquisar(filtro:LancamentoFiltro):Promise<any> {
    let params = new HttpParams();

    params = params.set('page',filtro.pagina);
    params = params.set('size',filtro.itensPorPagina);

    if(filtro.descricao){
      params = params.set('descricao',filtro.descricao);
    }

    if (filtro.dataVencimentoIincio) {
      params = params.set('dataVencimentoDe', this.datePipe.transform(filtro.dataVencimentoIincio, 'yyyy-MM-dd')!);
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', this.datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd')!);
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`,{ params })
      .toPromise().then((response:any)=>{
        const lancamentos = response['content'];

        const resultado = {
          lancamentos,
          total:response['totalElements']
        };
        return resultado;
      });
  }

  excluir(codigo:number):Promise<any>{
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`).toPromise()
      .then(()=>null);
  }

  adicionar(lancamento:Lancamento):Promise<any>{

    return this.http.post<Lancamento>(this.lancamentosUrl,lancamento).toPromise();
  }

  atualizar(lancamento:Lancamento):Promise<any>{
    return this.http.put<Lancamento>(`${this.lancamentosUrl}/${lancamento.codigo}`,lancamento).toPromise().then((response:any)=>{
        this.converterStringParaData([response]);
        return response;
    });

  }

  buscarPorCodigo(codigo:number):Promise<any>{
   return this.http.get(`${this.lancamentosUrl}/${codigo}`).toPromise()
      .then((response:any)=>{
        this.converterStringParaData([response]);
        return response;
      });
  }

  converterStringParaData(lancamentos:Lancamento[]){
    for (const lancamento of lancamentos) {
      let offset = new Date().getTimezoneOffset() * 60000;

      lancamento.dataVencimento = new Date(new Date(lancamento.dataVencimento!).getTime() + offset);

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = new Date(new Date(lancamento.dataPagamento).getTime() + offset);
      }
    }
  }
}
