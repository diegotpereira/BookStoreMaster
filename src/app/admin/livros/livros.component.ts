import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/model/Livro';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.css']
})
export class LivrosComponent implements OnInit {

  livros: Array<Livro>;
  selecionarLivro: Livro;
  acao: string;

  constructor(
    private httpClientService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.httpClientService.getLivros().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.acao = params['acao'];
      }
    )
  }

  handleSuccessfulResponse(response) {
    this.livros = response;
  }

  addLivro() {
    this.selecionarLivro = new Livro();
    this.router.navigate(['admin', 'livros'], { queryParams: { acao: 'add'}});
  }

}
