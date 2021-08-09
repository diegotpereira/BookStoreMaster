import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Livro } from '../model/Livro';

@Component({
  selector: 'app-loja-livro',
  templateUrl: './loja-livro.component.html',
  styleUrls: ['./loja-livro.component.css']
})
export class LojaLivroComponent implements OnInit {

  livros: Array<Livro>;
  livrosRecebidos: Array<Livro>;

  carrinhoLivros: any;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService
  ) { }

  ngOnInit() {
    this.httpClientService.getLivros().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    let data = localStorage.getItem('carrinho');
    if (data !== null) {
      this.carrinhoLivros = JSON.parse(data);
    } else {
      this.carrinhoLivros = [];
    }
  }

  handleSuccessfulResponse(response) {
    this.livros = new Array<Livro>();
    this.livrosRecebidos = response;
    for(const livro of this.livrosRecebidos) {
      const livroComCampodeImagemRecuperado = new Livro();
      livroComCampodeImagemRecuperado.id = livro.id;
      livroComCampodeImagemRecuperado.nome = livro.nome;
      // preencher o campo da imagem recuperada para que a imagem do livro possa ser exibida
      livroComCampodeImagemRecuperado.imagemRecuperada = 'data:image/jpeg;base64' + livro.picByte;
      // this.srcData = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64' + livro.picByte);
      livroComCampodeImagemRecuperado.autor = livro.autor;
      livroComCampodeImagemRecuperado.preco = livro.preco;
      livroComCampodeImagemRecuperado.picByte = livro.picByte;
      this.livros.push(livroComCampodeImagemRecuperado);
    }
  }

  adicionarAoCarrinho(livroId) {
    let livro = this.livros.find(livro => {
      return livro.id === +livroId;
    });

    let carrinhoData = [];
    let data = localStorage.getItem('carrinho');
    console.log(data);

    if (data !== null) {
      carrinhoData = JSON.parse(data);
    }

    carrinhoData.push(livro);

    this.atualizarCarrinhoData(carrinhoData);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoData));

    livro.estaAdicionado = true;
  }

  atualizarCarrinhoData(carrinhoData) {
    this.carrinhoLivros = carrinhoData;
  }

  irParaCarrinho() {
    this.router.navigate(['/carrinho']);
  }

  carrinhoVazio() {
    this.carrinhoLivros = [];
    localStorage.clear();
  }
}
