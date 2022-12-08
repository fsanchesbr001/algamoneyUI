import {Component,  OnInit} from '@angular/core';
import {LancamentoService} from "../lancamento.service";
import {Lancamento} from "../lancamento";
import {LancamentoFiltro} from "../lancamento-filtro";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
 filtro = new LancamentoFiltro();
 lancamentos:Lancamento[] = [];

  constructor(private lancamentoService:LancamentoService) {
  }

  ngOnInit(): void {
      this.listaLancamentos();
    }

  listaLancamentos():void{

   this.lancamentoService.pesquisar(this.filtro)
     .then(resultado=>this.lancamentos=resultado.lancamentos);
  }

}
