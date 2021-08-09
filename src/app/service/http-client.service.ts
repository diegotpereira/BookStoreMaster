import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../model/usuario';
import { Livro } from '../model/Livro';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {}

  getUsuarios() {
    return this.httpClient.get<Usuario[]>('http://localhost:8080/usuarios/get');
  }

  addUsuario(novoUsuario: Usuario) {
    return this.httpClient.post<Usuario>('http://localhost:8080/usuarios/add', novoUsuario);
  }

  deletarUsuario(id) {
    return this.httpClient.delete<Usuario>('http://localhost:8080/usuarios/' + id);
  }

  getLivros() {
    return this.httpClient.get<Livro[]>('http://localhost:8080/livros/get');
  }

  addLivro(novoLivro: Livro) {
    return this.httpClient.post<Livro>('http://localhost:8080/livros/add', novoLivro);
  }

  deletarLivro(id) {
    return this.httpClient.delete<Livro>('http://localhost:8080/livros/' + id);
  }

  atualizarLivro(atualizarLivro: Livro) {
    return this.httpClient.put<Livro>('http://localhost:8080/livros/update', atualizarLivro);
  }
}
