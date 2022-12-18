import {Component, ErrorHandler, OnInit} from '@angular/core';
import {CategoriaService} from "../../categorias/categoria.service";
import {PessoasService} from "../../pessoas/pessoas.service";
import {Lancamento} from "../../core/modelos/lancamento";
import { NgForm} from "@angular/forms";

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  tipos=[
    {label:'Receita',value:'RECEITA'},
    {label:'Despesa',value:'DESPESA'}
  ];

  categorias:any[]=[];

  pessoas:any[]=[];

  lancamento = new Lancamento();

  constructor(private categoriaService:CategoriaService,
              private pessoaService:PessoasService,
              private errorHandler:ErrorHandler) { }

  ngOnInit(): void {
    this.carregaPessoas();
    this.carregarCategorias();
  }

  carregaPessoas(){
    return this.pessoaService.pesquisarTodos().then(pessoas=>{
      this.pessoas=pessoas.map((p: { nome: any; codigo: any; })=>{
        return { label:p.nome,value:p.codigo }
      })
    })
      .catch(erro=>this.errorHandler.handleError(erro));
  }

  carregarCategorias(){
    return this.categoriaService.listarTudo().then(categorias=>{
      this.categorias = categorias.map((c: { nome: any; codigo: any; })=>{
        return {label:c.nome,value:c.codigo }
      });
    })
      .catch(erro=>this.errorHandler.handleError(erro));
  }

  salvar(form: NgForm){
    console.log(this.lancamento);
  }

}
