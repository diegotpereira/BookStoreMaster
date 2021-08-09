import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { UsuariosComponent } from './admin/usuarios/usuarios.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUsuarioComponent } from './admin/usuarios/add-usuario/add-usuario.component';
import { MostrarUsuarioComponent } from './admin/usuarios/mostrar-usuario/mostrar-usuario.component';
import { LivrosComponent } from './admin/livros/livros.component';
import { AddLivroComponent } from './admin/livros/add-livro/add-livro.component';
import { MostrarLivroComponent } from './admin/livros/mostrar-livro/mostrar-livro.component';
import { LojaLivroComponent } from './loja-livro/loja-livro.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    UsuariosComponent,
    AddUsuarioComponent,
    MostrarUsuarioComponent,
    LivrosComponent,
    AddLivroComponent,
    MostrarLivroComponent,
    LojaLivroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
