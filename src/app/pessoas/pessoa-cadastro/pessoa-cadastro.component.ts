import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  formulario! : FormGroup;

  constructor(private pessoaService:PessoasService,
              private messageService:MessageService,
              private errorService:ErrorHandlerService,
              private router:Router,
              private route:ActivatedRoute,
              private title:Title,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formulario= this.configurarFormulario();
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova Pessoa');
    if(codigoPessoa){
      this.carregarPessoa(codigoPessoa);
    }

  }

  configurarFormulario():FormGroup{
    return this.formBuilder.group({
      codigo:[],
      nome:[null,[Validators.required,Validators.minLength(5)]],
      ativo:[],
      endereco:this.formBuilder.group({
        endereco_logradouro:[null,Validators.required],
        endereco_numero:[null,Validators.required],
        endereco_complemento:[],
        endereco_bairro:[null,Validators.required],
        endereco_cep:[null,Validators.required],
        endereco_cidade:[null,Validators.required],
        endereco_estado:[null,Validators.required]
      })
    });
  }

  adicionarPessoa(){
    this.pessoaService.adicionar(this.formulario.value).then(pessoaAdicionada=>{
      this.messageService.add({severity:'success',detail:'Pessoa Incluida com sucesso'
        ,closable:true,life:3000});
      this.router.navigate(['/pessoas',pessoaAdicionada.codigo]);
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  atualizarPessoa(){
    this.pessoaService.atualizar(this.formulario.value).then((pessoa)=>{
      this.formulario.patchValue(pessoa);
      this.messageService.add({severity:'success',detail:'Pessoa Alterada com sucesso'
        ,closable:true,life:3000});
      this.atualizarTituloEdicao();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  salvar(){
    if(this.editando){
      this.atualizarPessoa();
    }
    else{
      this.adicionarPessoa();
    }
  }

  novo() {
    this.formulario.reset();
    this.formulario.patchValue(new Pessoa());
    this.title.setTitle('Nova Pessoa');
    this.router.navigate(['/pessoas/novo']);
  }

  private carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo).then(pessoa=>{
      this.formulario.patchValue(pessoa);
      this.atualizarTituloEdicao();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Pessoa: ${this.formulario.get('nome')}`);
  }

  get editando():Boolean{
    if(this.formulario.get('codigo')?.value!=null){
      return true;
    }
    return false;
  }
}
