import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AltaMateria } from '../models/alta-materia';
import { Alumno } from '../models/alumno';
import { Carta } from '../models/carta';

@Component({
  selector: 'app-ver-alumno',
  templateUrl: './ver-alumno.component.html',
  styleUrls: ['./ver-alumno.component.css']
})
export class VerAlumnoComponent implements OnInit {


  private alumno: Alumno;
  private alta_materia: AltaMateria;

  //private otroEval2: string;

  private lastCodigo: string;
  
  constructor(
    private _service: RestapiService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", this.alta_materia);

    this.lastCodigo = _route.snapshot.paramMap.get('codigo');
    
  }

  ngOnInit() {
  }

  /*
  private alumno: Alumno;
  private alta_materia: AltaMateria;

  private otroEval2: string;

  private lastCodigo: string;
  private idAlta: string;
  private idTutor: string;
  private idRevisor: string;
  private my_data_alumno: any;
  private my_data_alta: any;
  private my_data_tutor: any;
  private my_data_revisor: any;

  private plazoFormat: Date;
  private fechaFormat: Date;
  private mod: string;
  private fechaAsigTutor: Date;
  private fechaSufTutor: Date;
  private fechaAsigRevisor: Date;
  private fechaSufRevisor: Date;
  private fechaDefInterna: Date;
  private fechaDefExterna: Date;
  private resDefInterna: string;
  private resDefExterna: string;
  private eval2esOtro: Boolean;
  private evaluador2: string;

  private docentes: any;

  constructor(
    private _service: RestapiService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", this.alta_materia);

    this.lastCodigo = _route.snapshot.paramMap.get('codigo');
    this.getData();

    this._service.getGlobal('/Docente/getAll', '', '').subscribe(data => {
      this.docentes = data;
      console.log(JSON.stringify(this.docentes))
    }, error => {
      console.log(error);
    });

    this.eval2esOtro = false;
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
        console.log("Alta: " + data)
        this.my_data_alta = data;
        this.alta_materia = this.my_data_alta;
        this.plazoFormat = new Date(this.my_data_alta.plazo);
        this.fechaFormat = new Date(this.my_data_alta.fecha);
        this.mod = this.my_data_alta.modalidad.mod;
        this.idTutor = this.my_data_alta.tutor.doc;
        this.idRevisor = this.my_data_alta.revisor.doc;
        this.fechaAsigTutor = new Date(this.my_data_alta.tutor.fecha_asignacion);
        this.fechaSufTutor = new Date(this.my_data_alta.tutor.fecha_suficiencia);
        this.fechaAsigRevisor = new Date(this.my_data_alta.revisor.fecha_asignacion);
        this.fechaSufRevisor = new Date(this.my_data_alta.revisor.fecha_suficiencia);
        this.fechaDefInterna = new Date(this.my_data_alta.defensa_interna.fecha);
        this.fechaDefExterna = new Date(this.my_data_alta.defensa_externa.fecha);
        this.resDefInterna = this.my_data_alta.defensa_interna.resultado.toString();
        this.resDefExterna = this.my_data_alta.defensa_externa.resultado.toString();
        for (let i in this.docentes) {
          if (this.my_data_alta.defensa_externa.evaluador2.toString() === this.docentes[i].nombre.toString()) {
            this.eval2esOtro = false;
            break;
          } else {
            this.eval2esOtro = true;
          }
        }
        if (this.eval2esOtro && this.my_data_alta.defensa_externa.evaluador2.toString() !== "") {
          //this.alta_materia.defensa_externa.evaluador2 = "Otro";
          this.evaluador2 = "Otro";
        }
        if (this.idTutor !== null) {
          this._service.getGlobal('/Docente/get/' + this.idTutor, '', '').subscribe(data => {
            this.my_data_tutor = data;
          })
        }
        if (this.idRevisor !== null) {
          this._service.getGlobal('/Docente/get/' + this.idRevisor, '', '').subscribe(data => {
            this.my_data_revisor = data;
          })
        }
      }, error => {
        console.log(error)
      })

    }, error => {
      console.log(error)
    })
  }


  onSubmit() {
    if (this.alta_materia.defensa_externa.evaluador2 === 'Otro') {
      this.alta_materia.defensa_externa.evaluador2 = this.otroEval2;
    }
    //falta crear el metodo en backend xD
    this._service.putGlobal(this.alumno, '/Alumno/update' + this.lastCodigo, '').subscribe(data => {

    }), (err) => {
      console.log(err)
    }
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", this.alta_materia);

  }

*/
}
