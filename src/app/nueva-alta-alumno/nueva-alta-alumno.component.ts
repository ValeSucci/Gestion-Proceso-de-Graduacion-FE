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

  public temaToSearch;
  public my_data_tutor;
  public my_data_revisor;

  public data_busq_alumT: any = [];
  public data_busq_altT: any = [];
  public data_busq_alumR: any = [];
  public data_busq_altR: any = [];
  public cargosT: any = [];
  public cargosR: any = [];

  public altas_by_tema: any;
  public alumnos_by_tema: any;
  public tutores_by_tema: any;
  public revisores_by_tema: any;
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
      this.alta_materia.nro_alta = this.alumno.alta_materia.length + 1;
      this.alumno.alta_materia.push(this.alta_materia);
      console.log(data)
    }, error => {
      console.log(error)
    })

  }

  calcularAlumnosEnDocente(id: string, cargo: string) {
    this.data_busq_altT = [];
    this.data_busq_altR = [];
    this.data_busq_alumT = [];
    this.data_busq_alumR = [];
    this.cargosT = [];
    this.cargosR = [];
    let cont = 0;
    let d1: any;
    let d2: any;
    console.log(id)
    let busquedaT = new Busqueda("todos", id, "todos", "todos", "todos", "todos", "todos");
    this._service.postGlobal(busquedaT, '/Alumno/buscar', '').subscribe(data => {
      d1 = data;
      cont += d1.alumnos.length;
      if (cargo === 'T') {
        this.data_busq_altT = d1.altas;
        this.data_busq_alumT = d1.alumnos;
        for (let i in d1.altas) {
          this.cargosT.push("Tutor");
        }
      } else if (cargo === 'R') {
        this.data_busq_altR = d1.altas;
        this.data_busq_alumR = d1.alumnos;
        for (let i in d1.altas) {
          this.cargosR.push("Tutor");
        }
      }
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
        for (let i in d2.altas) {
          this.data_busq_altT.push(d2.altas[i]);
          this.data_busq_alumT.push(d2.alumnos[i]);
          this.cargosT.push("Revisor");
        }
        setTimeout(() => {
          this.alumDoc = cont;
          console.log(this.alumDoc)
        }, 200)
        for (let j in this.docentes) {
          if (id.toString() === this.docentes[j]._id.toString()) {
            this.codigoT = this.docentes[j].codigo;
            j = this.docentes.length + 1
          }
        }
      } else if (cargo === 'R') {
        for (let i in d2.altas) {
          this.data_busq_altR.push(d2.altas[i]);
          this.data_busq_alumR.push(d2.alumnos[i]);
          this.cargosR.push("Revisor");
        }
        setTimeout(() => {
          this.alumDocR = cont;
          console.log(this.alumDocR)
        }, 200)
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
    this.tutores_by_tema = [];
    this.revisores_by_tema = [];
    this._service.postGlobal({ tema: t }, '/Alumno/buscarPorTema', '').subscribe(data => {
      d = data;
      this.nTema = d.altas.length;
      this.altas_by_tema = d.altas;
      this.alumnos_by_tema = d.alumnos;

      for (let i in this.altas_by_tema) {
        let t: any;
        let r: any;
        if (this.altas_by_tema[i].tutor.doc) {
          this._service.getGlobal('/Docente/getById/' + this.altas_by_tema[i].tutor.doc, '', '').subscribe(data => {
            t = data;
            this.tutores_by_tema.push(t)
          })
        }
        if (this.altas_by_tema[i].revisor.doc) {
          this._service.getGlobal('/Docente/getById/' + this.altas_by_tema[i].revisor.doc, '', '').subscribe(data => {
            r = data;
            this.revisores_by_tema.push(r)
          })
        }
      }
      setTimeout(() => {
        for (let i in this.altas_by_tema) {
          if (!this.altas_by_tema[i].tutor.doc) {
            this.tutores_by_tema.splice(i, 0, { nombre: "-----" })
          }
          if (!this.altas_by_tema[i].revisor.doc) {
            this.revisores_by_tema.splice(i, 0, { nombre: "-----" })
          }
        }
      }, 300)

      console.log(this.tutores_by_tema)
      console.log(this.revisores_by_tema)
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
    //console.log(this.alumno)
    this._service.putGlobal(this.alumno, '/Alumno/nuevaAlta/' + this.lastCodigo, '').subscribe(data => {
      this._router.navigate(['ver-alumno', this.lastCodigo])
      console.log(this.alumno)
    }), (err) => {
      console.log(err)
    }
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", []);
    this.nTema = 0;
    this.alumDoc = 0;
    this.alumDocR = 0;

  }

}
