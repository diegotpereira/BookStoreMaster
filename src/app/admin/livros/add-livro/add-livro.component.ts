import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Livro } from 'src/app/model/Livro';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-livro',
  templateUrl: './add-livro.component.html',
  styleUrls: ['./add-livro.component.css']
})
export class AddLivroComponent implements OnInit {

  @Input()
  livro: Livro;
 

  @Output()
  livroAddEvent = new EventEmitter();
  private selecionarArquivo;
  imgURL: any;

  constructor(
    private httpClientService : HttpClientService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) { }

  ngOnInit() {  
  }

  public onFileChanged(event) {
    console.log(event);
    this.selecionarArquivo = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  salvarLivro() {
    if (this.livro.id == null) {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selecionarArquivo, this.selecionarArquivo.nome);
      this.selecionarArquivo.imageName = this.selecionarArquivo.nome;
  
      this.httpClient.post('http://localhost:8080/livros/upload', uploadData, {observe: 'response'})
          .subscribe((response) => {
            if (response.status === 200) {
              this.httpClientService.addLivro(this.livro)
                  .subscribe((livro) => {
                    this.livroAddEvent.emit();
                    this.router.navigate(['admin', 'livros']);
                  });
  
                  console.log('Imagem carregada com sucesso');
            } else {
              console.log('A imagem não foi enviada com sucesso');
            }
          }    
      );

    } else {
      this.httpClientService.atualizarLivro(this.livro).subscribe(
        (livro) => {
          this.livroAddEvent.emit();
          this.router.navigate(['admin','livros']);
        }
      );
    }
  }
}
