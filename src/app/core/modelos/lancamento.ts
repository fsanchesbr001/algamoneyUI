import {Pessoa} from "./pessoa";
import {Categoria} from "./categoria";

export class Lancamento{
  codigo!: number;
    descricao!:string;
    dataVencimento!:Date;
    dataPagamento!:Date;
    valor!:number;
    tipo:string='RECEITA';
    pessoa = new Pessoa();
    categorias=new Categoria();
    observacao!: string;
}
