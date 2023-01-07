import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServ:AuthService,
              private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authServ.isAccessTokenInvalido()){
      console.log('Navegação com access token inválido. Obtendo novo token...');
      return this.authServ.obterNovoAccessToken().then(()=>{
        if (this.authServ.isAccessTokenInvalido()) {
          this.router.navigate(['/login']);
          return false;
        }
        return this.podeAcessarRota(next.data['roles']);
      })
    }
    return this.podeAcessarRota(next.data['roles']);
  }

  private podeAcessarRota(roles: string[]): boolean {
    if (roles && !this.authServ.temQualquerPoermissao(roles)){
      this.router.navigate(['/acesso-nao-autorizado']);
      return false;
    }
    return true;
  }
}
