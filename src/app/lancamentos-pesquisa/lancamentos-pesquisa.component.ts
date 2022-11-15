import { Component} from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent {

  lancamentos = [
    {
      tipo:'DESPESA', descricao:'Compras do Mês', dataVencimento:new Date(2022,11,15),dataPagamento:new Date(2022,11,12)
      ,valor:325.00,pessoa:'Fabricio Sanches'
    },
    {
      tipo:'DESPESA', descricao:'PS Network', dataVencimento:new Date(2022,12,3),dataPagamento:new Date(2022,11,15)
      ,valor:325.00,pessoa:'Isabela Sanches'
    },
    {
      tipo:'RECEITA', descricao:'13 Salário', dataVencimento:new Date(2022,12,20),dataPagamento:new Date(2022,12,1)
      ,valor:6500.00,pessoa:'Fabricio Sanches'
    },
    {
      tipo:'RECEITA', descricao:'Dividendos', dataVencimento:new Date(2023,1,2),dataPagamento:new Date(2023,1,2)
      ,valor:5500.00,pessoa:'Fabricio Sanches'
    }
  ];

}
