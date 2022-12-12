import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LancamentoFiltro} from "./lancamento-filtro";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {
  lancamentosUrl = 'http://localhost:8080/lancamentos';

  private datePipe = new DatePipe('pt-BR');

  constructor(private http: HttpClient) { }

  pesquisar(filtro:LancamentoFiltro):Promise<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

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

    return this.http.get(`${this.lancamentosUrl}?resumo`,{ headers, params })
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
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`,
      {headers}).toPromise()
      .then(()=>null);
  }
}
