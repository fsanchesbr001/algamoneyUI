import {Endereco} from "../endereco";

export interface Pessoa{
  codigo:number;
  nome:string;
  ativo:boolean;
  endereco:Endereco;
}
