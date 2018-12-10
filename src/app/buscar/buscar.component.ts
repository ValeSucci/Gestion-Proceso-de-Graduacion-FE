import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Router } from '@angular/router';
import { Busqueda } from '../models/busqueda';
import { Alumno } from '../models/alumno';
import { Docente } from '../models/docente';
import { AltaMateria } from '../models/alta-materia';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  private busqueda: Busqueda;
  private alumnos: any;
  private docentes: any;
  private data_alumnos: [Alumno];
  private data_altas: [AltaMateria];
  private data_tutores: any;
  private data_revisores: any;
  private my_data: any;
  constructor(
    private _service: RestapiService,
    private _router: Router
  ) {
    this._service.getGlobal('/Docente/getAll', '', '').subscribe(data => {
      this.docentes = data;
      console.log(JSON.stringify(this.docentes))
    }, error => {
      console.log(error);
    });

    this._service.getGlobal('/Alumno/getAll', '', '').subscribe(data => {
      this.alumnos = data;
    }, error => {
      console.log(error)
    });

    this.busqueda = new Busqueda("", "", "", "", "", "", "");

    this.data_tutores = [];
    this.data_revisores = [];
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.busqueda.semestre === "" || this.busqueda.semestre === null) {
      this.busqueda.semestre = "todos";
    }
    console.log(this.busqueda)
    this._service.postGlobal(this.busqueda, '/Alumno/buscar', '').subscribe(data => {
      this.my_data = data;
      this.data_altas = this.my_data.altas;
      this.data_alumnos = this.my_data.alumnos;
      console.log(this.my_data)

      for (let i in this.data_altas) {
        if (this.data_altas[i].tutor.doc === null) {
          this.data_tutores.push({ nombre: "----" });
          console.log("Sin tutor: " + i + "  " + this.data_altas[i].tutor.doc)
        } else {
          for (let j in this.docentes) {
            if (this.data_altas[i].tutor.doc.toString() === this.docentes[j]._id.toString()) {
              this.data_tutores.push(this.docentes[j]);
              console.log("Con tutor: " + this.data_altas[i].tutor.doc + " " + this.docentes[j]._id)
              j = this.docentes.length + 1
            }
          }
        }
        if (this.data_altas[i].revisor.doc === null) {
          this.data_revisores.push({ nombre: "----" });
        } else {
          for (let j in this.docentes) {
            if (this.data_altas[i].revisor.doc.toString() === this.docentes[j]._id.toString()) {
              this.data_revisores.push(this.docentes[j]);
              j = this.docentes.length + 1
            }
          }
        }
      }
    }), (err) => {
      console.log(err)
    }

    this.busqueda = new Busqueda("", "", "", "", "", "", "");

  }
}
