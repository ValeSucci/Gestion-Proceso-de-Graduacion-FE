import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { HomeComponent } from './home/home.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { LoginComponent } from './login/login.component';
import { RestapiService } from './services/restapi.service';
import { LoggerService } from './services/logger.service';

@NgModule({
  declarations: [
    AppComponent,
    CrearDocenteComponent,
    HomeComponent,
    CrearAlumnoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
    appRoutingProviders,
    RestapiService,
    LoggerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
