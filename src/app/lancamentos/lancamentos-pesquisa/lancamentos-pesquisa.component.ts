import {Component, OnInit, ViewChild} from '@angular/core';
import {LancamentoService} from "../lancamento.service";
import {Lancamento} from "../../core/modelos/lancamento";
import {LancamentoFiltro} from "../lancamento-filtro";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {Table} from "primeng/table";
import {ErrorHandlerService} from "../../core/error-handler.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit{
 filtro = new LancamentoFiltro();
 lancamentos:Lancamento[] = [];
 totalRegistros = 0;

  @ViewChild('tabela') grid!: Table;

  constructor(private lancamentoService:LancamentoService,
              private messageService:MessageService,
              private confirmation:ConfirmationService,
              private errorService:ErrorHandlerService,
              private title:Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Pesquisa de Lançamentos')
  }

  listaLancamentos(pagina =0):void{
   this.filtro.pagina=pagina;
   this.lancamentoService.pesquisar(this.filtro)
     .then(resultado=>{
       this.lancamentos = resultado.lancamentos;
       this.totalRegistros = resultado.total;
     })
     .catch(erro=>this.errorService.handle(erro));
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first!  / event.rows!;
    this.listaLancamentos(pagina);
  }
  excluir(lancamento:any){
    this.confirmation.confirm({
      message:'Deseja excluir realmente?',
      accept:()=>{
        this.lancamentoService.excluir(lancamento.codigo)
          .then(()=>{
            this.grid.reset();
            this.messageService.add({severity:'success',detail:'Lancamento Excluido com sucesso'
              ,closable:true,life:3000});
          })
          .catch(erro=>this.errorService.handle(erro));
      }
    });
  }
}
