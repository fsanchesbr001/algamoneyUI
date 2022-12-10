import {Component,  OnInit} from '@angular/core';
import {LancamentoService} from "../lancamento.service";
import {Lancamento} from "../lancamento";
import {LancamentoFiltro} from "../lancamento-filtro";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
 filtro = new LancamentoFiltro();
 lancamentos:Lancamento[] = [];
 totalRegistros = 0;

  constructor(private lancamentoService:LancamentoService) {
  }

  ngOnInit(): void {
     // this.listaLancamentos();
    }

  listaLancamentos(pagina =0):void{
   this.filtro.pagina=pagina;
   this.lancamentoService.pesquisar(this.filtro)
     .then(resultado=>{
       this.lancamentos = resultado.lancamentos;
       this.totalRegistros = resultado.total;
     });
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first!  / event.rows!;
    this.listaLancamentos(pagina);
  }
}
