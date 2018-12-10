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
import { ActualizarDocenteComponent } from './actualizar-docente/actualizar-docente.component';
import { VerDocenteComponent } from './ver-docente/ver-docente.component';
import { DocentesComponent } from './docentes/docentes.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ActualizarAlumnoComponent } from './actualizar-alumno/actualizar-alumno.component';
import { BuscarComponent } from './buscar/buscar.component';
@NgModule({
  declarations: [
    AppComponent,
    CrearDocenteComponent,
    HomeComponent,
    CrearAlumnoComponent,
    LoginComponent,
    ActualizarDocenteComponent,
    VerDocenteComponent,
    DocentesComponent,
    EditarUsuarioComponent,
    ActualizarAlumnoComponent,
    BuscarComponent
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
