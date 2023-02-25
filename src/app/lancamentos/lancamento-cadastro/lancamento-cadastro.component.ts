import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../categorias/categoria.service";
import {PessoasService} from "../../pessoas/pessoas.service";
import {Lancamento} from "../../core/modelos/lancamento";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LancamentoService} from "../lancamento.service";
import {MessageService} from "primeng/api";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {retry} from "rxjs";

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

  formulario!:FormGroup;

  constructor(private categoriaService:CategoriaService,
              private pessoaService:PessoasService,
              private lancamentoService:LancamentoService,
              private messageService:MessageService,
              private errorService:ErrorHandlerService,
              private route:ActivatedRoute,
              private router:Router,
              private title:Title,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.configurarFormulario();
    const codigoLancamento = this.route.snapshot.params['codigo'];
    this.title.setTitle('Novo Lançamento');
    if(codigoLancamento){
      this.carregarLancamento(codigoLancamento);
    }

    this.carregaPessoas();
    this.carregarCategorias();
  }

  configurarFormulario():FormGroup{
    return this.formulario = this.formBuilder.group({
      codigo: [],
      tipo: ['RECEITA'],
      dataVencimento: [null, this.validarObrigatorio],
      dataPagamento: [],
      descricao: [null, [this.validarObrigatorio, Validators.minLength(5)]],
      valor: [null, Validators.required],
      pessoa: this.formBuilder.group({
        codigo: [null, Validators.required],
        nome: []
      }),
      categorias: this.formBuilder.group({
        codigo: [null,Validators.required],
        nome: []
      }),
      observacao: []
    });
  }

  get editando():Boolean{
    return Boolean(this.formulario.get('codigo')?.value);
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

  salvar(){
    if (this.editando){
      this.atualizarLancamento();
    }
    else {
      this.adicionarLancamento();
    }
  }

  atualizarLancamento(){
    this.lancamentoService.atualizar(this.formulario.value).then((lancamento)=>{
      this.formulario.patchValue(lancamento);
      this.messageService.add({severity:'success',detail:'Lancamento Alterado com sucesso'
        ,closable:true,life:3000});
      this.atualizarTituloEdicao();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  adicionarLancamento(){
    this.lancamentoService.adicionar(this.formulario.value).then(lancamentoAdicionado=>{
      this.messageService.add({severity:'success',detail:'Lancamento Incluido com sucesso'
        ,closable:true,life:3000});

      this.router.navigate(['/lancamentos',lancamentoAdicionado.codigo]);
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  carregarLancamento(codigo:number){
    this.lancamentoService.buscarPorCodigo(codigo).then(lancamento=>{
      this.formulario.patchValue(lancamento);
      this.atualizarTituloEdicao();
    })
      .catch(erro=>this.errorService.handle(erro))
  }

  novo() {
    this.formulario.reset();
    this.formulario.patchValue(new Lancamento())
    this.router.navigate(['lancamentos/novo']);
  }

  atualizarTituloEdicao(){
    this.title.setTitle(`Edição de Lançamento: ${this.formulario.get('descricao')?.value}`);
  }

  validarObrigatorio(input:FormControl){
    return (input.value ? null : {obrigatorio:true});
  }


}
