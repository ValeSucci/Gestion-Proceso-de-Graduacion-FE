import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Actividad } from '../models/actividad';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  private usuario: Usuario
  private lastUsername: string;
  private lastPassword: string;
  private lastNombre: string;
  private pass1: string;
  private pass2: string;
  private lastTelefono: number;
  private lastCorreo: string;
  private my_data: any;
  constructor(
    private _service: RestapiService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null, new Actividad("", null));
    this.lastUsername = _route.snapshot.paramMap.get('username');
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this._service.getGlobal('/Usuario/get/' + this.lastUsername, '', '').subscribe(data => {
      this.my_data = data;
      this.lastNombre = this.my_data.nombre;
      this.lastTelefono = this.my_data.telefono;
      this.lastCorreo = this.my_data.correo;
      this.lastPassword = this.my_data.password;
      this.usuario = this.my_data;
    }, error => {
      console.log(error)
    })
  }

  onSubmit() {
    //console.log(this.pass1 + '...' + this.pass2)
    if (this.pass1 === this.pass2 && !(this.pass1 === null || (typeof this.pass1 === 'undefined' || typeof this.pass2 === 'undefined'))) {
      this.usuario.password = this.pass1;
    }
    //console.log(this.usuario)
    this._service.putGlobal(this.usuario, '/Usuario/update/' + this.lastUsername, '').subscribe(data => {
      //console.log(data)
      this._router.navigate(['/home'])
    }), (err) => {
      console.log(err)
    }
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null, new Actividad("", null));
  }


}
