import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { LivrosComponent } from './admin/livros/livros.component';
import { LojaLivroComponent } from './loja-livro/loja-livro.component';

const routes: Routes = [
  {
    path: 'admin/usuarios', component: UsuariosComponent
  },
  {
    path: 'admin/livros', component: LivrosComponent
  },
  {
    path: 'loja', component: LojaLivroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
