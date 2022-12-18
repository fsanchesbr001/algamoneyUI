import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../categorias/categoria.service";
import {PessoasService} from "../../pessoas/pessoas.service";
import {Lancamento} from "../../core/modelos/lancamento";
import { NgForm} from "@angular/forms";
import {LancamentoService} from "../lancamento.service";
import {MessageService} from "primeng/api";
import {ErrorHandlerService} from "../../core/error-handler.service";

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
              private lancamentoService:LancamentoService,
              private messageService:MessageService,
              private errorService:ErrorHandlerService) { }

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
      .catch(erro=>this.errorService.handle(erro));
  }

  carregarCategorias(){
    return this.categoriaService.listarTudo().then(categorias=>{
      this.categorias = categorias.map((c: { nome: any; codigo: any; })=>{
        return {label:c.nome,value:c.codigo }
      });
    })
      .catch(erro=>this.errorService.handle(erro));
  }

  salvar(form: NgForm){
    this.lancamentoService.adicionar(this.lancamento).then(()=>{
      this.messageService.add({severity:'success',detail:'Lancamento Incluido com sucesso'
        ,closable:true,life:3000});

      form.reset();
      this.lancamento = new Lancamento();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

}
