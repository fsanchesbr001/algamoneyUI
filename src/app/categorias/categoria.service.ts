import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Categoria} from "../core/modelos/categoria";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http:HttpClient) { }

  listarTudo():Promise<any>{
    const headers = new HttpHeaders()
      .append('Authorization','Basic YWRtaW5AYWRtaW4uY29tOmFkbWlu');

    return this.http.get(`${this.categoriasUrl}`,{headers}).toPromise()
      .then((response:any)=>{
        return response;
      });
  }
}
