import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';
import { NotificacionesService } from './services/notificaciones.service';
import { Notificacion } from './models/notificacion';
import { Alumno } from './models/alumno';
import { _getViewData } from '@angular/core/src/render3/instructions';
import { RestapiService } from './services/restapi.service';
import { Router } from '@angular/router';

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

  constructor(public _logger: LoggerService, public _notificaciones: NotificacionesService, public _service: RestapiService, public _router: Router) {
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
    if(!n.visto) {
      this.nNotif = this.nNotif - 1;
      this._notificaciones.updateVisto(n);
    }
    this.showHideNotifications();
    //if (n.asunto.toString() !== "Solicitar Revisión de Carpeta") {
    this._router.navigate(['ver-alumno', cod])
    //}
  }


}
