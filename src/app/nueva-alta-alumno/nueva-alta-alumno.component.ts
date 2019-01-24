import { Component, OnInit } from '@angular/core';
import { AltaMateria } from '../models/alta-materia';
import { Alumno } from '../models/alumno';
import { Busqueda } from '../models/busqueda';
import { RestapiService } from '../services/restapi.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Carta } from '../models/carta';

@Component({
  selector: 'app-nueva-alta-alumno',
  templateUrl: './nueva-alta-alumno.component.html',
  styleUrls: ['./nueva-alta-alumno.component.css']
})
export class NuevaAltaAlumnoComponent implements OnInit {

  public docentes: any;
  //public alumnos: any;

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

  public lastCodigo: string;
  public my_data_alumno: any;

  constructor(public _service: RestapiService, public _router: Router, public _route: ActivatedRoute,
  ) {
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

    /*this._service.getGlobal('/Alumno/getAll', '', '').subscribe(data => {
      this.alumnos = data;
    }, error => {
      console.log(error)
    });*/

    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", []);

    this.lastCodigo = _route.snapshot.paramMap.get('codigo');
    this.getData();

  }

  ngOnInit() {

  }

  getData() {
    this._service.getGlobal('/Alumno/get/' + this.lastCodigo, '', '').subscribe(data => {
      this.my_data_alumno = data;
      this.alumno = this.my_data_alumno;
      this.alta_materia.nro_alta = this.alumno.alta_materia.length+1;
      this.alumno.alta_materia.push(this.alta_materia);
      console.log(data)
    }, error => {
      console.log(error)
    })

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

  searchTema(t: string) {
    let d = null;
    this._service.postGlobal({ tema: t }, '/Alumno/buscarPorTema', '').subscribe(data => {
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
    console.log(this.alumno)
    this._service.putGlobal(this.alumno, '/Alumno/nuevaAlta/'+this.lastCodigo, '').subscribe(data => {
      this._router.navigate(['/ver-alumno',this.alumno.codigo]);
    }), (err) => {
      console.log(err)
    }
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", []);

  }

}
