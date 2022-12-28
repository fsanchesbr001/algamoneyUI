import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Pessoa} from "../../core/modelos/pessoa";
import {PessoasService} from "../pessoas.service";
import {MessageService} from "primeng/api";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(private pessoaService:PessoasService,
              private messageService:MessageService,
              private errorService:ErrorHandlerService,
              private router:Router,
              private route:ActivatedRoute,
              private title:Title) { }

  ngOnInit(): void {
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Pessoa');
    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa);
    }

  }

  adicionarPessoa(form:NgForm){
    this.pessoaService.adicionar(this.pessoa).then(()=>{
      this.messageService.add({severity:'success',detail:'Pessoa Incluida com sucesso'
        ,closable:true,life:3000});

      form.reset();
      this.pessoa = new Pessoa();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  atualizarPessoa(form: NgForm){
    this.pessoaService.atualizar(this.pessoa).then((pessoa)=>{
      this.pessoa = pessoa;
      this.messageService.add({severity:'success',detail:'Pessoa Alterada com sucesso'
        ,closable:true,life:3000});
      this.atualizarTituloEdicao();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  salvar(form:NgForm){
    if(this.editando){
      this.atualizarPessoa(form);
    }
    else{
      this.adicionarPessoa(form);
    }
  }

  novo(pessoaForm: NgForm) {
    pessoaForm.reset();
    setTimeout(() => {
      this.pessoa = new Pessoa();
    }, 1);
    this.title.setTitle('Nova Pessoa');
    this.router.navigate(['/pessoas/novo']);
  }

  private carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then(pessoa=>{
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Pessoa: ${this.pessoa.nome}`);
  }

  get editando():Boolean{
    return Boolean(this.pessoa.codigo);
  }
}
