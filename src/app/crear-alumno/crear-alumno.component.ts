import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Alumno } from '../models/alumno';
import { AltaMateria } from '../models/alta-materia';
import { Carta } from '../models/carta';
import { Docente } from '../models/docente';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit {
  private docentes: any;
  private alumnos: any;
  private idDoc: string;
  private alumDoc: number;

  private alumno: Alumno;

  constructor(private _service: RestapiService) {
    this.alumDoc = 0;
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


    this.alumno = new Alumno(0, "", new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: false }));
  }

  ngOnInit() {

  }

  calcularAlumnosEnDocente() {

    let cont = 0;
    for (let i in this.alumnos) {
      let a = this.alumnos[i];
      //this._service.getGlobal()
      //hacer get de todos los elementos
      console.log(a)
      if (a.alta_materia.tutor.doc === this.idDoc || a.alta_materia.revisor.doc === this.idDoc) {
        cont++;
      }
    }

    this.alumDoc = cont;
    //obtener docente con idDoc(id)
    //calcular alumnos
    //return alumnos calculados
  }

  onSubmit(){
    this._service.postGlobal(this.alumno,'/Alumno/create','').subscribe(data => {

    }), (err)=>{
      console.log(err)
    }
    this.alumno = new Alumno(0, "", new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: false }));  
  }



}
