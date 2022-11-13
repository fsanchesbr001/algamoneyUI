import { Component} from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    {
      tipo:'DESPESA', descricao:'Compras do Mês', dataVencimento:'15/11/2022',dataPagamento:'12/11/2022'
      ,valor:325.00,pessoa:'Fabricio Sanches'
    },
    {
      tipo:'DESPESA', descricao:'PS Network', dataVencimento:'03/12/2022',dataPagamento:'12/11/2022'
      ,valor:325.00,pessoa:'Isabela Sanches'
    },
    {
      tipo:'RECEITA', descricao:'13 Salário', dataVencimento:'20/12/2022',dataPagamento:'01/12/2022'
      ,valor:6500.00,pessoa:'Fabricio Sanches'
    },
    {
      tipo:'RECEITA', descricao:'Dividendos', dataVencimento:'02/01/2023',dataPagamento:'02/01/2023'
      ,valor:5500.00,pessoa:'Fabricio Sanches'
    }
  ];

}
