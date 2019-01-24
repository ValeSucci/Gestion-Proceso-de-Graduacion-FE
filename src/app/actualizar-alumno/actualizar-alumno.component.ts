import { Component, OnInit } from '@angular/core';
import { Alumno } from '../models/alumno';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AltaMateria } from '../models/alta-materia';
import { Carta } from '../models/carta';
import { Docente } from '../models/docente';
import { Busqueda } from '../models/busqueda';

@Component({
  selector: 'app-actualizar-alumno',
  templateUrl: './actualizar-alumno.component.html',
  styleUrls: ['./actualizar-alumno.component.css']
})
export class ActualizarAlumnoComponent implements OnInit {
  public alumno: Alumno;
  public alta_materia: AltaMateria;

  public alumDoc: number;
  public alumDocR: number;
  public codigoT: number;
  public codigoR: number;

  public data_busq_alumT: any = [];
  public data_busq_altT: any = [];
  public data_busq_alumR: any = [];
  public data_busq_altR: any = [];
  public cargosT: any = [];
  public cargosR: any = [];



  public otroEval2: string;
  public otroEval1: string;

  public lastCodigo: string;
  public idAlta: string;
  public idTutor: string;
  public idRevisor: string;
  public my_data_alumno: any;
  public my_data_alta: any;
  public my_data_tutor: any;
  public my_data_revisor: any;

  public altas_by_tema: any;
  public alumnos_by_tema: any;
  public nTema: number;

  public plazoFormat: Date;
  public fechaFormat: Date;
  public mod: string;
  public fechaAsigTutor: Date;
  public fechaSufTutor: Date;
  public fechaAsigRevisor: Date;
  public fechaSufRevisor: Date;
  public fechaDefInterna: Date;
  public fechaDefExterna: Date;
  public resDefInterna: string;
  public resDefExterna: string;
  public eval2esOtro: Boolean;
  public evaluador2: string;
  public eval1esOtro: Boolean;
  public evaluador1: string;

  public docentes: any;

  constructor(
    public _service: RestapiService,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", []);

    this.my_data_tutor = new Docente(0, "", "", 0, "")
    this.my_data_revisor = new Docente(0, "", "", 0, "")

    this.alumDoc = 0;
    this.alumDocR = 0;
    this.codigoT = null;
    this.codigoR = null;

    this.idTutor = null;
    this.idRevisor = null;

    this.nTema = 0;

    this.lastCodigo = _route.snapshot.paramMap.get('codigo');
    this.getData();

    this._service.getGlobal('/Docente/getAll', '', '').subscribe(data => {
      this.docentes = data;
      console.log(JSON.stringify(this.docentes))
    }, error => {
      console.log(error);
    });

    //  this.eval2esOtro = false;
  }

  ngOnInit() {
  }

  getData() {
    this._service.getGlobal('/Alumno/get/' + this.lastCodigo, '', '').subscribe(data => {
      this.my_data_alumno = data;
      this.alumno = this.my_data_alumno;
      this.idAlta = this.my_data_alumno.alta_materia[this.my_data_alumno.alta_materia.length - 1];
      console.log(this.idAlta)
      console.log(data)
      this._service.getGlobal('/AltaMateria/get/' + this.idAlta, '', '').subscribe(data => {
        console.log(data)
        this.my_data_alta = data;
        this.alta_materia = this.my_data_alta;
        this.plazoFormat = this.my_data_alta.plazo;
        this.alta_materia.fecha = this.my_data_alta.fecha.toString().substring(0, 10);
        this.mod = this.my_data_alta.modalidad.mod;
        this.idTutor = this.my_data_alta.tutor.doc;
        this.idRevisor = this.my_data_alta.revisor.doc;
        this.idTutor ? this.calcularAlumnosEnDocente(this.idTutor, 'T') : this.alumDoc = 0;
        this.idRevisor ? this.calcularAlumnosEnDocente(this.idRevisor, 'R') : this.alumDocR = 0;
        this.alta_materia.tutor.fecha_asignacion = this.alta_materia.tutor.fecha_asignacion ? this.my_data_alta.tutor.fecha_asignacion.toString().substring(0, 10) : null;
        this.alta_materia.tutor.fecha_suficiencia = this.alta_materia.tutor.fecha_suficiencia ? this.my_data_alta.tutor.fecha_suficiencia.toString().substring(0, 10) : null;
        this.alta_materia.revisor.fecha_asignacion = this.alta_materia.revisor.fecha_asignacion ? this.my_data_alta.revisor.fecha_asignacion.toString().substring(0, 10) : null;
        this.alta_materia.revisor.fecha_suficiencia = this.alta_materia.revisor.fecha_suficiencia ? this.my_data_alta.revisor.fecha_suficiencia.toString().substring(0, 10) : null;
        this.alta_materia.defensa_interna.fecha = this.alta_materia.defensa_interna.fecha ? this.my_data_alta.defensa_interna.fecha.toString().substring(0, 10) : null;
        this.alta_materia.defensa_externa.fecha = this.alta_materia.defensa_externa.fecha ? this.my_data_alta.defensa_externa.fecha.toString().substring(0, 10) : null;
        this.resDefInterna = this.my_data_alta.defensa_interna.resultado.toString();
        this.resDefExterna = this.my_data_alta.defensa_externa.resultado.toString();
        for (let i in this.docentes) {
          if (this.alta_materia.defensa_externa.evaluador2.toString() === this.docentes[i].nombre.toString()) {
            this.eval2esOtro = false;
            break;
          } else {
            this.eval2esOtro = true;
          }
        }
        if (this.eval2esOtro && this.alta_materia.defensa_externa.evaluador2.toString() !== "") {
          //this.alta_materia.defensa_externa.evaluador2 = "Otro";
          this.evaluador2 = "Otro";
          this.otroEval2 = this.alta_materia.defensa_externa.evaluador2.toString();
          this.alta_materia.defensa_externa.evaluador2 = "Otro";
          console.log(this.eval2esOtro)
        }
        for (let i in this.docentes) {
          if (this.alta_materia.defensa_externa.evaluador1.toString() === this.docentes[i].nombre.toString()) {
            this.eval1esOtro = false;
            break;
          } else {
            this.eval1esOtro = true;
          }
        }
        if (this.eval1esOtro && this.alta_materia.defensa_externa.evaluador1.toString() !== "") {
          //this.alta_materia.defensa_externa.evaluador2 = "Otro";
          this.evaluador1 = "Otro";
          this.otroEval1 = this.alta_materia.defensa_externa.evaluador1.toString();
          this.alta_materia.defensa_externa.evaluador1 = "Otro";
          console.log(this.eval1esOtro)
        }
        if (this.idTutor !== null) {
          this._service.getGlobal('/Docente/getById/' + this.idTutor, '', '').subscribe(data => {
            this.my_data_tutor = data;
            console.log("T: " + this.my_data_tutor)
          })
        }
        if (this.idRevisor !== null) {
          this._service.getGlobal('/Docente/getById/' + this.idRevisor, '', '').subscribe(data => {
            this.my_data_revisor = data;
            console.log("R: " + this.my_data_revisor)
          })
        }
      }, error => {
        console.log(error)
      })

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
        this.alumDoc = cont;
        console.log(this.alumDoc)
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
      this.altas_by_tema = d.altas;
      this.alumnos_by_tema = d.alumnos;
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
    console.log(this.alta_materia)

    this._service.putGlobal({ alumno: this.alumno, alta: this.alta_materia }, '/Alumno/update/' + this.idAlta, '').subscribe(data => {
      //console.log(this.alumno)
      this._router.navigate(['ver-alumno', this.alumno.codigo])
    }), (err) => {
      console.log(err)
    }
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", []);

  }


}
