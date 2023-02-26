import { Component, OnInit } from '@angular/core';
import {RelatoriosService} from "../relatorios.service";

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {
  periodoInicio: Date = new Date();
  periodoFim: Date = new Date();

  constructor(private relatorioService:RelatoriosService) { }

  ngOnInit(): void {

  }

  gerar() {
    this.relatorioService.relatorioLancamentosPorPessoa(this.periodoInicio!,this.periodoFim!)
      .then(relatorio=>{
        // @ts-ignore
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  }
}
