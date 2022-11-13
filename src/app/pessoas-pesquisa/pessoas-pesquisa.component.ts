import { Component } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent {
  pessoas = [
    {nome:'Ana Maria Sanches',cidade:'Caldas Novas',estado:'GO',ativo:true},
    {nome:'Maria Sanches',cidade:'Caldas Novas',estado:'GO',ativo:false},
    {nome:'Barbara Sanches',cidade:'Caldas Novas',estado:'GO',ativo:true},
    {nome:'Josy Vieira',cidade:'Caldas Novas',estado:'GO',ativo:false},
    {nome:'Thamara Brito',cidade:'Caldas Novas',estado:'GO',ativo:true},
    {nome:'Fabricio Sanches',cidade:'São Paulo',estado:'SP',ativo:true},
    {nome:'Janaina Capelli Junqueira',cidade:'São Paulo',estado:'SP',ativo:false}
  ]
}
