import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  jwtPayload:any;

  constructor(private http:HttpClient, private jwtHelper:JwtHelperService) {
    this.carregarToken();
  }

  login(usuario:String,senha:String):Promise<void>{

    const headers = new HttpHeaders()
      .append('Authorization','Basic YW5ndWxhcjpAbmd1bEByMA==')
      .append('Content-Type','application/x-www-form-urlencoded');
    const body =`client=angular&username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl,body,{headers}).toPromise().then((response:any)=>{
      this.armazenarToken(response['access_token']);
    })
      .catch(response=>{
        if(response.status===400 && response.error.error==='invalid_grant'){
          return Promise.reject('Usuário ou senha inválida');
        }
        return Promise.reject(response);
      });
  }

  private armazenarToken(token:string){
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token',token);
  }

  private carregarToken(){
    const token = localStorage.getItem('token');

    if(token){
      this.armazenarToken(token);
    }
  }
}
