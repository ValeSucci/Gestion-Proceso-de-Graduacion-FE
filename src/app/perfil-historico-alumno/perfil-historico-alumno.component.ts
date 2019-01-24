import { Component, OnInit } from '@angular/core';
import { Alumno } from '../models/alumno';
import { AltaMateria } from '../models/alta-materia';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Docente } from '../models/docente';
import { Carta } from '../models/carta';

@Component({
  selector: 'app-perfil-historico-alumno',
  templateUrl: './perfil-historico-alumno.component.html',
  styleUrls: ['./perfil-historico-alumno.component.css']
})
export class PerfilHistoricoAlumnoComponent implements OnInit {

  public alumno: Alumno;
  public alta_materia: AltaMateria;

  public lastCodigo: string;
  public idAlta: string;
  public idTutor: string;
  public idRevisor: string;
  public my_data_alumno: any;
  public my_data_alta: any;
  public my_data_tutor: any;
  public my_data_revisor: any;


  public tutores: Docente[];
  public revisores: Docente[];
  public altas: AltaMateria[];

  constructor(
    public _service: RestapiService,
    public _route: ActivatedRoute,
    public _router: Router
  ) {
    this.alta_materia = new AltaMateria(0, "", null, null, false, { est: "", color: "" }, { mod: "", trabDirig: { empresa: "", fecha_suficiencia: null } }, "", "", { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null, paga: true }, { doc: "", fecha_asignacion: null, cite_carta: "", ubicacion_carta: new Carta("", ""), fecha_suficiencia: null }, { fecha: null, resultado: "", observacion: "" }, { fecha: null, presidente: "", evaluador1: "", evaluador2: "", resultado: "" })
    this.alumno = new Alumno(0, "", []);

    this.tutores = [];
    this.revisores = [];
    this.altas = [];

    this.my_data_tutor = new Docente(0, "-------------------------------------", "", 0, "")
    this.my_data_revisor = new Docente(0, "-------------------------------------", "", 0, "")

    this.idTutor = null;
    this.idRevisor = null;

    this.lastCodigo = _route.snapshot.paramMap.get('codigo');
    this.getData();

    this.altas.reverse();
    this.tutores.reverse();
    this.revisores.reverse();


  }

  ngOnInit() {
  }

  getData() {
    this._service.getGlobal('/Alumno/get/' + this.lastCodigo, '', '').subscribe(data => {
      this.my_data_alumno = data;
      this.alumno = this.my_data_alumno;
      //console.log(data)
      for (let i in this.my_data_alumno.alta_materia) {
        this.idAlta = this.my_data_alumno.alta_materia[i];
        console.log(this.idAlta)
        this._service.getGlobal('/AltaMateria/get/' + this.idAlta, '', '').subscribe(data => {
          //console.log(data)
          this.my_data_alta = data;
          this.alta_materia = this.my_data_alta;
          this.alta_materia.fecha = this.my_data_alta.fecha.toString().substring(0, 10);
          this.idTutor = this.my_data_alta.tutor.doc;
          this.idRevisor = this.my_data_alta.revisor.doc;
          this.alta_materia.tutor.fecha_asignacion = this.alta_materia.tutor.fecha_asignacion ? this.my_data_alta.tutor.fecha_asignacion.toString().substring(0, 10) : "--------------";
          this.alta_materia.tutor.fecha_suficiencia = this.alta_materia.tutor.fecha_suficiencia ? this.my_data_alta.tutor.fecha_suficiencia.toString().substring(0, 10) : "--------------";
          this.alta_materia.revisor.fecha_asignacion = this.alta_materia.revisor.fecha_asignacion ? this.my_data_alta.revisor.fecha_asignacion.toString().substring(0, 10) : "--------------";
          this.alta_materia.revisor.fecha_suficiencia = this.alta_materia.revisor.fecha_suficiencia ? this.my_data_alta.revisor.fecha_suficiencia.toString().substring(0, 10) : "--------------";
          this.altas.push(this.alta_materia);
          console.log(this.alta_materia)
          if (this.idTutor !== null) {
            this._service.getGlobal('/Docente/getById/' + this.idTutor, '', '').subscribe(data => {
              this.my_data_tutor = data;
              this.tutores.push(this.my_data_tutor);
              //console.log("T: " + this.tutores)
            })
          } else {
            this.tutores.push(this.my_data_tutor);
          }
          if (this.idRevisor !== null) {
            this._service.getGlobal('/Docente/getById/' + this.idRevisor, '', '').subscribe(data => {
              this.my_data_revisor = data;
              this.revisores.push(this.my_data_revisor);
              //console.log("R: " + this.revisores)
            })
          } else {
            this.revisores.push(this.my_data_revisor);
          }
        }, error => {
          console.log(error)
        })
      }
    }, error => {
      console.log(error)
    })
  }


}
