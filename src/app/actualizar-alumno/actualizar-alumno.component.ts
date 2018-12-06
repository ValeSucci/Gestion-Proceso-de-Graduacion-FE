import { Component, OnInit } from '@angular/core';
import { Alumno } from '../models/alumno';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar-alumno',
  templateUrl: './actualizar-alumno.component.html',
  styleUrls: ['./actualizar-alumno.component.css']
})
export class ActualizarAlumnoComponent implements OnInit {
//  private alumno: Alumno
  private lastCodigo: string;
  private my_data: any;
  constructor(
    private _service: RestapiService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    //this.alumno = new Usuario("", "", "", 0, "", false, false, null, null, new Actividad("", null));
    this.lastCodigo = _route.snapshot.paramMap.get('codigo');
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    /*this._service.getGlobal('/Usuario/get/' + this.lastUsername, '', '').subscribe(data => {
      this.my_data = data;
      this.lastNombre = this.my_data.nombre;
      this.lastTelefono = this.my_data.telefono;
      this.lastCorreo = this.my_data.correo;
      this.lastPassword = this.my_data.password;
      this.usuario = this.my_data;
    }, error => {
      console.log(error)
    })*/
  }

  onSubmit() {
    /*
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
    */
  }


}
