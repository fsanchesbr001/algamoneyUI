import {Endereco} from "./endereco";

export class Pessoa{
  codigo!:number;
  nome!:string;
  ativo:boolean=false;
  endereco = new Endereco();
}
