import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: Array<Usuario>;
  selecionarUsuario: Usuario;
  acao: string;

  constructor(
    private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.httpClientService.getUsuarios().subscribe(response => this.handleSuccessfulResponse(response),
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.acao = params['acao'];
        const selecionarUsuarioId = params['id'];
        if (selecionarUsuarioId) {
          this.selecionarUsuario = this.usuarios.find(usuario => usuario.id === + selecionarUsuarioId);
        }
      }
    );
  }

  handleSuccessfulResponse(response) {
    this.usuarios = response;
    // console.log(this.usuarios);
  }

  mostrarUsuario(id: number) {
    this.router.navigate(['admin', 'usuarios'], {queryParams : {id, acao: 'mostrar'}});
  }

  addUsuario() {
    this.selecionarUsuario = new Usuario();
    this.router.navigate(['admin', 'usuarios'], { queryParams: { acao: 'add'}});
  }
}
