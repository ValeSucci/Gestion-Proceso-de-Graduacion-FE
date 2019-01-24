import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public menu: boolean
  public notifications: boolean
  title = 'GestionProcesoGraduacionFE';
  pagetitle = 'Sistema de Gestión de Proceso de Graduación';
  constructor(public _logger: LoggerService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menu = false;
    this.notifications = false;
  }

  showHideMenu() {
    this.menu = !this.menu;
    if(this.notifications) {
      this.notifications = false;
    }
  }

  showHideNotifications(){
    this.notifications = !this.notifications;
    console.log(this.notifications)
    if(this.menu) {
      this.menu = false;
    }    
  }

  logout(){
   this._logger.logOut(); 
  }

}
