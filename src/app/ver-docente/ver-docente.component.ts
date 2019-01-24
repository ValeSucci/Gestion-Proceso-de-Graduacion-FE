import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute } from '@angular/router';
import { Busqueda } from '../models/busqueda';
import { ExcelService } from '../services/excel.service';

@Component({
  selector: 'app-ver-docente',
  templateUrl: './ver-docente.component.html',
  styleUrls: ['./ver-docente.component.css']
})
export class VerDocenteComponent implements OnInit {
  public lastCodigo: number;
  public lastNombre: string;
  public lastDireccion: string;
  public lastTelefono: number;
  public lastCorreo: string;
  public my_data: any;

  public data_tutor: any;
  public data_altas_tutor: any;
  public data_alumnos_tutor: any;

  public data_revisor: any;
  public data_altas_revisor: any;
  public data_alumnos_revisor: any;


  constructor(public _service: RestapiService, public _route: ActivatedRoute, public excelService: ExcelService) {
    this.lastCodigo = parseInt(_route.snapshot.paramMap.get('codigo'));
    this.getData();
    this.data_altas_tutor = null;
    this.data_alumnos_tutor = null;
    this.data_altas_revisor = null;
    this.data_alumnos_revisor = null;
  }

  ngOnInit() {
  }

  getData() {
    this._service.getGlobal('/Docente/get/' + this.lastCodigo, '', '').subscribe(data => {
      this.my_data = data;
      this.lastNombre = this.my_data.nombre;
      this.lastDireccion = this.my_data.direccion;
      this.lastTelefono = this.my_data.telefono;
      this.lastCorreo = this.my_data.correo;
      this.getDataTutor();
      this.getDataRevisor();
      //      console.log(this.data_altas_tutor)
    }, error => {
      console.log(error)
    })
  }

  getDataTutor() {
    let busqueda = new Busqueda("todos", this.my_data._id, "todos", "todos", "todos", "todos", "todos");
    console.log(busqueda)
    this._service.postGlobal(busqueda, '/Alumno/buscar', '').subscribe(data => {
      this.data_tutor = data;
      this.data_altas_tutor = this.data_tutor.altas;
      this.data_alumnos_tutor = this.data_tutor.alumnos;
      console.log(this.data_altas_tutor)
    }), (err) => {
      console.log(err)
    }
  }

  getDataRevisor() {
    let busqueda = new Busqueda("todos", "todos", "todos", this.my_data._id, "todos", "todos", "todos");
    this._service.postGlobal(busqueda, '/Alumno/buscar', '').subscribe(data => {
      this.data_revisor = data;
      this.data_altas_revisor = this.data_revisor.altas;
      this.data_alumnos_revisor = this.data_revisor.alumnos;
      console.log(this.data_altas_revisor)
    }), (err) => {
      console.log(err)
    }
  }


  exportAsXLSX(): void {
    let data_excel = [];
    for(let i in this.data_altas_tutor) {
      let elem={
        "T/R":"Tutor",
        Alumno:this.data_alumnos_tutor[i].nombre,
        Código: this.data_alumnos_tutor[i].codigo,
        Semestre:this.data_altas_tutor[i].semestre,
        Tema: this.data_altas_tutor[i].tema,
        "Fecha de Asignación": this.data_altas_tutor[i].tutor.fecha_asignacion?this.data_altas_tutor[i].tutor.fecha_asignacion.toString().substring(0,10):"---",
        "Fecha de Suficiencia": this.data_altas_tutor[i].tutor.fecha_suficiencia?this.data_altas_tutor[i].tutor.fecha_asignacion.toString().substring(0,10):"---",
        Estado: this.data_altas_tutor[i].estado.est
      }
      data_excel.push(elem)
      console.log(elem)
    }
    for(let i in this.data_altas_revisor) {
      let elem={
        "T/R":"Revisor",
        Alumno:this.data_alumnos_revisor[i].nombre,
        Código: this.data_alumnos_revisor[i].codigo,
        Semestre:this.data_altas_revisor[i].semestre,
        Tema: this.data_altas_revisor[i].tema,
        "Fecha de Asignación": this.data_altas_revisor[i].revisor.fecha_asignacion?this.data_altas_revisor[i].revisor.fecha_asignacion.toString().substring(0,10):"---",
        "Fecha de Suficiencia": this.data_altas_revisor[i].revisor.fecha_suficiencia?this.data_altas_revisor[i].revisor.fecha_asignacion.toString().substring(0,10):"---",
        Estado: this.data_altas_revisor[i].estado.est
      }
      data_excel.push(elem)
      console.log(elem)
    }

    this.excelService.exportAsExcelFile(data_excel, 'histórico_docente');
  }

}
