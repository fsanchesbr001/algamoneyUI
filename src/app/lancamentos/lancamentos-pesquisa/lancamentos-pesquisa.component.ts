import {Component,  OnInit} from '@angular/core';
import {LancamentoService} from "../lancamento.service";
import {Lancamento} from "../lancamento";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{

 lancamentos:Lancamento[] = [];

  constructor(private lancamentoService:LancamentoService) {
  }

  ngOnInit(): void {
      this.listaLancamentos();
    }

  listaLancamentos():void{
   this.lancamentoService.pesquisar().then(lancamentos=>this.lancamentos=lancamentos);
  }

}
