import { Component } from '@angular/core';
import { LoggerService } from './services/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private menu: boolean
  title = 'GestionProcesoGraduacionFE';
  pagetitle = 'Sistema de Gestión de Proceso de Graduación';
  constructor(private _logger: LoggerService) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.menu = false;
  }

  showHideMenu() {
    this.menu = !this.menu;
  }

  logout(){
   this._logger.logOut(); 
  }

}
