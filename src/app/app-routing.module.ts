import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { LivrosComponent } from './admin/livros/livros.component';

const routes: Routes = [
  {
    path: 'admin/usuarios', component: UsuariosComponent
  },
  {
    path: 'admin/livros', component: LivrosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
