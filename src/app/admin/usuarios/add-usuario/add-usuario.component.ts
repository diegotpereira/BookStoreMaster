import { Component, Input, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  @Input()
  usuario: Usuario

  @Output()
  usuarioAddEvent = new EventEmitter();

  novoUsuario: Usuario;
  message: string;
  password: string;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) { }

  ngOnInit() {
    this.novoUsuario = Object.assign({}, this.usuario);
  }

  addUsuario() {
    this.httpClientService.addUsuario(this.usuario).subscribe(
      (usuario) => {
        this.usuarioAddEvent.emit();
        this.router.navigate(['admin', 'usuarios']);
      }
    );
  }
}
