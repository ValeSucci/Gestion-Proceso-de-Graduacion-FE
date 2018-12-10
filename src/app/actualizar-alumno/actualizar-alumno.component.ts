import { Component, OnInit } from '@angular/core';
import { Alumno } from '../models/alumno';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AltaMateria } from '../models/alta-materia';
import { Carta } from '../models/carta';

@Component({
  selector: 'app-actualizar-alumno',
  templateUrl: './actualizar-alumno.component.html',
  styleUrls: ['./actualizar-alumno.component.css']
})
export class ActualizarAlumnoComponent implements OnInit {
  private alumno: Alumno;
  private alta_materia: AltaMateria;
 
  private lastCodigo: string;
  private idAlta: string;
  private my_data_alumno: any;
  private my_data_alta: any;

  private plazoFormat: string;
  private fechaFormat: string;

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
        let p = this.my_data_alta.plazo;
        this.plazoFormat = p.getDate()+"/"+(p.getMonth()+1)+"/"+p.getFullYear();
        let f = this.my_data_alta.fecha;
        this.fechaFormat = f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate();
        
      }, error => {
        console.log(error)
      })

    }, error => {
      console.log(error)
    })
  }


  onSubmit() {
    /*
    //console.log(this.pass1 + '...' + this.pass2)
    if (this.pass1 === this.pass2 && !(this.pass1 === null || (typeof this.pass1 === 'undefined' || typeof this.pass2 === 'undefined'))) {
      this.usuario.password = this.pass1;
    }
    //console.log(this.usuario)
    this._service.putGlobal(this.usuario, '/Usuario/update/' + this.lastUsername, '').subscribe(data => {
      //console.log(data)
      this._router.navigate(['/home'])
    }), (err) => {
      console.log(err)
    }
    this.usuario = new Usuario("", "", "", 0, "", false, false, null, null, new Actividad("", null));
    */
  }


}
