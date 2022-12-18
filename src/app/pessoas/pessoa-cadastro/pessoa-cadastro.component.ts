import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Pessoa} from "../../core/modelos/pessoa";
import {PessoasService} from "../pessoas.service";
import {MessageService} from "primeng/api";
import {ErrorHandlerService} from "../../core/error-handler.service";

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  constructor(private pessoaService:PessoasService,
              private messageService:MessageService,
              private errorService:ErrorHandlerService) { }

  ngOnInit(): void {
  }

  salvar(form:NgForm){
    this.pessoaService.adicionar(this.pessoa).then(()=>{
      this.messageService.add({severity:'success',detail:'Pessoa Incluida com sucesso'
        ,closable:true,life:3000});

      form.reset();
      this.pessoa = new Pessoa();
    })
      .catch(erro=>this.errorService.handle(erro))
  }
}
