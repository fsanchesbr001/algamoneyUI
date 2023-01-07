import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaginaNaoEncontradaComponent} from "./core/pagina-nao-encontrada/pagina-nao-encontrada.component";
import {AcessoNaoAutorizadoComponent} from "./core/acesso-nao-autorizado/acesso-nao-autorizado.component";

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:"full"},
  {path:'pagina-nao-encontrada', component:PaginaNaoEncontradaComponent},
  {path:'acesso-nao-autorizado', component:AcessoNaoAutorizadoComponent},
  {path:'**', redirectTo:'pagina-nao-encontrada'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
