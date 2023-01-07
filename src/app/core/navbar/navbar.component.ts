import { Component} from '@angular/core';
import {AuthService} from "../../seguranca/auth.service";
import {Router} from "@angular/router";
import {ErrorHandlerService} from "../error-handler.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  exibindoMenu: boolean=false;
  usuarioLogado: string = '';

  constructor(private auth:AuthService,
              private router:Router,
              private error:ErrorHandlerService) {
  }
  ngOnInit() {
    this.usuarioLogado = this.auth.jwtPayload?.nome;
  }

  temPermissao(permissao:string){
    return this.auth.temPermissao(permissao);
  }

  logout(){
    this.auth.logout().then(()=>{
      this.router.navigate(['/login']);
    })
      .catch(erro=>this.error.handle(erro));
  }
}
