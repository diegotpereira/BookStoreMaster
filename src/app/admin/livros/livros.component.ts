import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/model/Livro';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl  } from '@angular/platform-browser';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  livros: Array<Livro>;
  livrosRecebidos: Array<Livro>;
  selecionarLivro: Livro;
  acao: string;
  imagemRecuperada: any;

  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
   this.refreshData();
  }

  refreshData() {
    this.httpClientService.getLivros().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.acao = params['acao'];
        // obtenha o id do parâmetro. este será o id do livro cujos detalhes
        // devem ser exibidos quando a ação é vista
        const id = params['id'];
        
        // se o id existir, converta-o para inteiro e recupere o livro da série de livros
        if (id) {
          this.selecionarLivro = this.livros.find(livro => {
            return livro.id === + id;
          });
        }
      }
    );
  }

  // vamos pegar a resposta dos livros retornada do banco de dados
  //e estaremos adicionando o recuperado
  handleSuccessfulResponse(response) {
    this.livros = new Array<Livro>();
    // obter livros devolvidos pela chamada da API
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

  getImagemRecuperada(url) { 
    return this.sanitizer.bypassSecurityTrustUrl(url); 
  }

  addLivro() {
    this.selecionarLivro = new Livro();
    this.router.navigate(['admin', 'livros'], { queryParams: { acao: 'add'}});
  }

  mostrarLivro(id: number) {
    this.router.navigate(['admin', 'livros'], {queryParams: {id, acao: 'mostrar'}});
  }
}
