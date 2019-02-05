import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { NotificacionesService } from './services/notificaciones.service';
import { Notificacion } from './models/notificacion';
import { Alumno } from './models/alumno';
import { RestapiService } from './services/restapi.service';
import { Router } from '@angular/router';
import { WordService } from './services/word.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'GestionProcesoGraduacionFE';
  pagetitle = 'Sistema de Gestión de Proceso de Graduación';

  public menu: boolean
  public notifications: boolean

  public notificaciones: Notificacion[];
  public alumnos_notificaciones: Alumno[];
  public alumnos: Alumno[];
  public data_alumnos: any;
  public nNotif: number;

  public fff: boolean;
  public f: FormGroup;
  public ftype;

  constructor(public _logger: LoggerService, public _notificaciones: NotificacionesService, public _service: RestapiService, public _router: Router, public _word: WordService, public _builder: FormBuilder) {
    this.f = this._builder.group({
      name: ['doc', Validators.required],
      file: null
    });
    this.fff = false;

    this._notificaciones.generarNotificaciones();
    let aux = this._notificaciones.getNotificaciones().notif;
    setTimeout(() => {
      this.notificaciones = aux;
      this.nNotif = this._notificaciones.getNotificaciones().n;
    }, 300)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menu = false;
    this.notifications = false;
  }

  showHideMenu() {
    this.menu = !this.menu;
    if (this.notifications) {
      this.notifications = false;
    }
  }

  showHideNotifications() {
    this.notifications = !this.notifications;
    console.log(this.notifications)
    if (this.menu) {
      this.menu = false;
    }
  }

  logout() {
    this._logger.logOut();
  }


  verNotificacion(n: any, cod: number) {
    if (!n.visto) {
      this.nNotif = this.nNotif - 1;
      this._notificaciones.updateVisto(n);
    }
    this.showHideNotifications();
    //if (n.asunto.toString() !== "Solicitar Revisión de Carpeta") {
    this._router.navigate(['ver-alumno', cod])
    //}
  }

  onFileChangeUpdateTutor(event) {
    this.fff = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ftype = file.type;
        this.f.get('file').setValue({
          filename: 'doc',
          filetype: file.type,
          value: (reader.result).toString().split(',')[1]
        });
        let uri = this.f.value.file.value;
        let t = this.ftype;
        if (t !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          return alert('ERROR! \n Por favor utilice el tipo de archivo ".docx"')
        }
        this._service.putGlobal({ hash: uri }, '/carta/update/' + true, '').subscribe(data => { alert('Actualizado') }, err => { console.log(err) })
      };
      //console.log(this.f)
    }
  }

  onFileChangeUpdateRevisor(event) {
    this.fff = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ftype = file.type;
        this.f.get('file').setValue({
          filename: 'doc',
          filetype: file.type,
          value: (reader.result).toString().split(',')[1]
        });
        let uri = this.f.value.file.value;
        let t = this.ftype;
        if (t !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          return alert('ERROR! \n Por favor utilice el tipo de archivo ".docx"')
        }
        this._service.putGlobal({ hash: uri }, '/carta/update/' + false, '').subscribe(data => {
          alert('Actualizado')
        }, err => { console.log(err) })
      };
      //console.log(this.f)
    }
  }

  onFileChangeNewT(event) {
    this.fff = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ftype = file.type;
        this.f.get('file').setValue({
          filename: 'doc',
          filetype: file.type,
          value: (reader.result).toString().split(',')[1]
        });
        let uri = this.f.value.file.value;
        let t = this.ftype;
        if (t !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          return alert('Por favor utilice el tipo de archivo ".docx"')
        }
        this._service.postGlobal({ hash: uri, tipo: t, cargo: true }, '/carta/add', '').subscribe(data => { alert('Guardado') }, err => { console.log(err) })
      };
    } else {
      alert('error')
    }
  }

  onFileChangeNewR(event) {
    this.fff = true;
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.ftype = file.type;
        this.f.get('file').setValue({
          filename: 'doc',
          filetype: file.type,
          value: (reader.result).toString().split(',')[1]
        });
        let uri = this.f.value.file.value;
        let t = this.ftype;
        if (t !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          return alert('Por favor utilice el tipo de archivo ".docx"')
        }
        this._service.postGlobal({ hash: uri, tipo: t, cargo: false }, '/carta/add', '')
          .subscribe(data => { alert('Guardado') }, err => { console.log(err) })
      };
    }
  }

}
