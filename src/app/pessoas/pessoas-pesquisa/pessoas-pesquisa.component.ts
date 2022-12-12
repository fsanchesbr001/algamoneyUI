import { Component } from '@angular/core';
import {PessoasFiltro} from "../pessoas-filtro";
import {Pessoa} from "../pessoa";
import {PessoasService} from "../pessoas.service";
import {LazyLoadEvent} from "primeng/api";

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  filtro = new PessoasFiltro();
  totalRegistros = 0;
  pessoas:Pessoa[] = [];

  constructor(private pessoaService:PessoasService) {}

  ngOnInit(): void{}

  pesquisar(pagina=0):void {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro).then(resultado=>{
      this.pessoas = resultado.pessoas;
      console.log(this.pessoas);
      this.totalRegistros = resultado.total;
      console.log(this.totalRegistros);
    });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    console.log(event);
    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);
  }
}
