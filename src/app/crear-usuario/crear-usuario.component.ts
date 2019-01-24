import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { RestapiService } from '../services/restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
  
  public usuario: Usuario;
  public pass1: string;
  public pass2: string;

  pagetitle = 'Usuario';
  constructor(
    public _service: RestapiService,
    public _router: Router
  ) { 
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null);
  }

  ngOnInit() {
  }

  onSubmit(){
    if (this.pass1 === this.pass2 && !(this.pass1 === null || (typeof this.pass1 === 'undefined' || typeof this.pass2 === 'undefined'))) {
      this.usuario.password = this.pass1;
    }
    console.log(this.usuario)
    this._service.postGlobal(this.usuario,'/Usuario/create','').subscribe(data => {
      console.log("hecho")
      this._router.navigate(['ver-usuarios'])
    }), (err)=>{
      console.log(err)
    }
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null);
  }

}
