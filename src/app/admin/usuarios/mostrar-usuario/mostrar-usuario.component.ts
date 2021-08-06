import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.component.html',
  styleUrls: ['./mostrar-usuario.component.css']
})
export class MostrarUsuarioComponent implements OnInit {

  @Input()
  usuario: Usuario

  @Output()
  usuarioDeletarEvent = new EventEmitter();

  constructor(
    private httpClientService: HttpClientService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deletarUsuario() {
    this.httpClientService.deletarUsuario(this.usuario.id).subscribe(
      (usuario) => {
        this.usuarioDeletarEvent.emit();
        this.router.navigate(['admin', 'usuarios']);
      }
    );
  }

}
