import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Router } from '@angular/router';
import { Busqueda } from '../models/busqueda';
import { Alumno } from '../models/alumno';
import { Docente } from '../models/docente';
import { AltaMateria } from '../models/alta-materia';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  public busqueda: Busqueda;
  public alumnos: any;
  public docentes: any;
  public data_alumnos: Alumno[];
  public data_altas: AltaMateria[];
  public data_tutores: any;
  public data_revisores: any;
  public my_data: any;
  public conBusqueda: Boolean;
  constructor(
    public _service: RestapiService,
    public _router: Router,
    public excelService: ExcelService
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
    this.data_alumnos = [];
    this.data_altas = [];

    //this.conBusqueda = false;
  }

  cambiarNombresModalidades() {
    /*
    for(let i in this.data_altas) {
      let m = this.data_altas[i].modalidad.mod.toString();
      if(m === "excelencia") {
        this.data_altas[]
      }
    }*/
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

        //cambiarNombresModalidades();
      }

    }), (err) => {
      console.log(err)


      this.busqueda = new Busqueda("", "", "", "", "", "", "");
      this.data_tutores = [];
      this.data_revisores = [];
      this.data_alumnos = [];
      this.data_altas = [];

    }
  }


  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  }, {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  }, {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];


  
  exportAsXLSX(): void {
    let data_excel = [];
    for(let i in this.data_altas) {
      let elem={
        Alumno:this.data_alumnos[i].nombre,
        Código: this.data_alumnos[i].codigo,
        Semestre:this.data_altas[i].semestre,
        Modalidad: this.data_altas[i].modalidad.mod,
        Tema: this.data_altas[i].tema,
        Estado: this.data_altas[i].estado.est,
        Tutor: this.data_tutores[i].nombre,
        Revisor:this.data_revisores[i].nombre
      }
      data_excel.push(elem)
      console.log(elem)
    }
    this.excelService.exportAsExcelFile(data_excel, 'consulta');
  }
}