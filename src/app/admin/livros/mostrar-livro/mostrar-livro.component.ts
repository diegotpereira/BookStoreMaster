import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Livro } from 'src/app/model/Livro';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';


@Component({
  selector: 'app-mostrar-livro',
  templateUrl: './mostrar-livro.component.html',
  styleUrls: ['./mostrar-livro.component.css']
})
export class MostrarLivroComponent implements OnInit {

  @Input()
  livro: Livro
  
  @Output()
  livroDeletarEvent = new EventEmitter();

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deletarLivro() {
    this.httpClientService.deletarLivro(this.livro.id).subscribe(
      (livro) => {
        this.livroDeletarEvent.emit();
        this.router.navigate(['admin', 'livros']);
      }
    )
  }

  editLivro() {
    this.router.navigate(['admin', 'livros'], { queryParams: { acao: 'edit', id: this.livro.id}});
  }
}
