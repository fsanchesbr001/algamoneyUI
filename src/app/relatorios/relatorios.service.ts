import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RelatoriosService {

  lancamentosUrl: string;

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
    const params = new HttpParams()
      .set('inicio', this.datePipe.transform(inicio, 'yyyy-MM-dd')!)
      .set('fim', this.datePipe.transform(fim, 'yyyy-MM-dd')!);

    return this.http.get(`${this.lancamentosUrl}/relatorios/lancamentos-pessoa`,
      { params, responseType: 'blob' })
      .toPromise();
  }
}
