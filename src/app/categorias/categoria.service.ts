import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http:HttpClient) { }

  listarTudo():Promise<any>{
    return this.http.get(`${this.categoriasUrl}`).toPromise()
      .then((response:any)=>{
        return response;
      });
  }
}
