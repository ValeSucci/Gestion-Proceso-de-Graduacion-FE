import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Alumno } from '../models/alumno';
import { AltaMateria } from '../models/alta-materia';
import { Carta } from '../models/carta';
import { Docente } from '../models/docente';
import { Router } from '@angular/router';
import { Busqueda } from '../models/busqueda';

@Component({
  selector: 'app-crear-alumno',
  templateUrl: './crear-alumno.component.html',
  styleUrls: ['./crear-alumno.component.css']
})
export class CrearAlumnoComponent implements OnInit {
  public docentes: any;
  public alumnos: any;

  public alumDoc: number;
  public alumDocR: number;
  public codigoT: number;
  public codigoR: number;

  public altas_by_tema: any;
  public alumnos_by_tema: any;
  public nTema: number;

  public otroEval2: string;
  public otroEval1: string;

  public alumno: Alumno;
  public alta_materia: AltaMateria;
  constructor(public _service: RestapiService, public _router: Router) {
    this.alumDoc = 0;
    this.alumDocR = 0;
    this.codigoT = null;
    this.codigoR = null;

    this.nTema = 0;

    //this.otroeval2 = "";
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
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", [this.alta_materia]);
  }

  ngOnInit() {

  }

  calcularAlumnosEnDocente(id: string, cargo: string) {

    let cont = 0;
    let d1: any;
    let d2: any;
    console.log(id)
    let busquedaT = new Busqueda("todos", id, "todos", "todos", "todos", "todos", "todos");
    this._service.postGlobal(busquedaT, '/Alumno/buscar', '').subscribe(data => {
      d1 = data;
      cont += d1.alumnos.length;
      console.log("T: " + cont)
    }), (err) => {
      console.log(err)
    }
    let busquedaR = new Busqueda("todos", "todos", "todos", id, "todos", "todos", "todos");
    this._service.postGlobal(busquedaR, '/Alumno/buscar', '').subscribe(data => {
      d2 = data;
      cont += d2.alumnos.length;
      console.log("R: " + cont)
      if (cargo === 'T') {
        this.alumDoc = cont;
        console.log(this.alumDoc)
        for (let j in this.docentes) {
          if (id.toString() === this.docentes[j]._id.toString()) {
            this.codigoT = this.docentes[j].codigo;            
            j = this.docentes.length + 1
          }
        }
      } else if (cargo === 'R') {
        this.alumDocR = cont;
        console.log(this.alumDocR)
        for (let j in this.docentes) {
          if (id.toString() === this.docentes[j]._id.toString()) {
            this.codigoR = this.docentes[j].codigo;            
            j = this.docentes.length + 1
          }
        }
      }
    }), (err) => {
      console.log(err)
    }
  }

  searchTema(t: string){
    let d = null;
    this._service.postGlobal({tema: t}, '/Alumno/buscarPorTema', '').subscribe(data => {
      d = data;
      this.nTema = d.altas.length;
      console.log(this.nTema)
    }), (err) => {
      console.log(err)
    }
  }

  onSubmit() {

    if (this.alta_materia.defensa_externa.evaluador2 === 'Otro') {
      this.alta_materia.defensa_externa.evaluador2 = this.otroEval2;
    }
    if (this.alta_materia.defensa_externa.evaluador1 === 'Otro') {
      this.alta_materia.defensa_externa.evaluador1 = this.otroEval1;
    }
    this._service.postGlobal(this.alumno, '/Alumno/create', '').subscribe(data => {
      this._router.navigate(['/ver-alumno',this.alumno.codigo]);
    }), (err) => {
      console.log(err)
    }
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", [this.alta_materia]);

  }


  openWord(cargo: string) {
    this._service.postGlobal(this.alta_materia, '/Alumno/openWord/'+cargo, '').subscribe(data => {
      
    }), (err) => {
      console.log(err)
    }
  }
  
  /*

var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');

var fs = require('fs');
var path = require('path');

module.exports = getDoc = function (data, file) {
    // Cargo el docx como un  binary
    var content = fs.readFileSync(path.resolve( file), 'binary');

    var zip = new JSZip(content);

    var doc = new Docxtemplater();
    doc.loadZip(zip);

    // setea los valores de data ej: { first_name: 'John' , last_name: 'Doe'}
    doc.setData(data);

    try {
        // renderiza el documento (remplaza las ocurrencias como {first_name} by John, {last_name} by Doe, ...)
        doc.render();
    }
    catch (error) {
        var e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
        }
        console.log(JSON.stringify({ error: e }));
        throw error;
    }

    var buffer = doc.getZip()
        .generate({ type: 'nodebuffer' });

    fs.writeFileSync(path.resolve('tmpdocs', data.doc + file), buffer);

    return path.resolve(__dirname.replace('tmpdocs', data.doc + file);
}
*/


}
