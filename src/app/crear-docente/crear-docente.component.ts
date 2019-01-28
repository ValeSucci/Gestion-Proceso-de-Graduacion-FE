import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Router } from '@angular/router';
import { Docente } from '../models/docente';

@Component({
  selector: 'app-crear-docente',
  templateUrl: './crear-docente.component.html',
  styleUrls: ['./crear-docente.component.css']
})
export class CrearDocenteComponent implements OnInit {
  public docente: Docente;
  pagetitle = 'Docentes';
  constructor(
    public _service: RestapiService,
    public _router: Router
  ) {
    this.docente = new Docente(0, "", "", 0, "")
  }

  ngOnInit() {
  }

  onSubmit() {
    this._service.postGlobal(this.docente, '/Docente/create', '').subscribe(data => {
      let mdata: any = data;
      this._router.navigate(['ver-docente', mdata.codigo])
    }), (err) => {
      console.log(err)
    }
    this.docente = new Docente(0, "", "", 0, "")
  }

}
