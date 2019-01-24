import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  public usuario: Usuario
  public lastUsername: string;
  public lastPassword: string;
  public lastNombre: string;
  public pass1: string;
  public pass2: string;
  public lastTelefono: number;
  public lastCorreo: string;
  public my_data: any;
  constructor(
    public _service: RestapiService,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null);
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
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null);
  }


}
