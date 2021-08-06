import { Component, OnInit, Input } from '@angular/core';
import { Livro } from 'src/app/model/Livro';

@Component({
  selector: 'app-add-livro',
  templateUrl: './add-livro.component.html',
  styleUrls: ['./add-livro.component.css']
})
export class AddLivroComponent implements OnInit {

  @Input()
  livro: Livro;

  constructor() { }

  ngOnInit(): void {
  }

}
