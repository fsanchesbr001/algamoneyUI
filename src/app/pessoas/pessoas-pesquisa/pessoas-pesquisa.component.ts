import {Component, ViewChild} from '@angular/core';
import {PessoasFiltro} from "../pessoas-filtro";
import {Pessoa} from "../pessoa";
import {PessoasService} from "../pessoas.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {ErrorHandlerService} from "../../core/error-handler.service";

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  filtro = new PessoasFiltro();
  totalRegistros = 0;
  pessoas:Pessoa[] = [];

  @ViewChild('tabela') grid!: Table;

  constructor(private pessoaService:PessoasService,
              private messageService:MessageService,
              private confirmation:ConfirmationService,
              private errorService:ErrorHandlerService) {}

  ngOnInit(): void{}

  pesquisar(pagina=0):void {
    this.filtro.pagina = pagina;
    this.pessoaService.pesquisar(this.filtro).then(resultado=>{
      this.pessoas = resultado.pessoas;
      this.totalRegistros = resultado.total;
    })
    .catch(erro=>this.errorService.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    console.log(event);
    const pagina = event.first! / event.rows!;
    this.pesquisar(pagina);
  }

  excluir(pessoa:any){
    this.confirmation.confirm({
      message:'Deseja excluir realmente?',
      accept:()=>{
        this.pessoaService.excluir(pessoa.codigo)
          .then(()=>{
            this.grid.reset();
            this.messageService.add({severity:'success',detail:'Pessoa Excluida com sucesso'
              ,closable:true,life:3000});
          })
          .catch(erro=>this.errorService.handle(erro));
      }
    });
  }

  alterarStatus(pessoa:any):void{

    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo,novoStatus)
      .then(()=>{
        const acao = novoStatus ? 'ativada' : 'desativada';
        pessoa.ativo = novoStatus;
        this.grid.reset();
        this.messageService.add({severity:'success',detail:`Pessoa ${acao} com sucesso`
          ,closable:true,life:3000});
      })
      .catch(erro=>this.errorService.handle(erro));


  }

}
