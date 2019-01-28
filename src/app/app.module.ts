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
import { NuevaAltaAlumnoComponent } from './nueva-alta-alumno/nueva-alta-alumno.component';
import { VerAlumnoComponent } from './ver-alumno/ver-alumno.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioAdmiComponent } from './editar-usuario-admi/editar-usuario-admi.component';
import { ExcelService } from './services/excel.service';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { PerfilHistoricoAlumnoComponent } from './perfil-historico-alumno/perfil-historico-alumno.component';
import { NotificacionesService } from './services/notificaciones.service';
import { GuardGuard } from './guards/guard.guard';
import { InitComponent } from './init/init.component';
import { RoleGuard } from './guards/role.guard';
import { AdminComponent } from './admin/admin.component';
import { OtherGuard } from './guards/other.guard';
import { EncriptadorService } from './services/encriptador.service';
import { WordService } from './services/word.service';
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
    BuscarComponent,
    NuevaAltaAlumnoComponent,
    VerAlumnoComponent,
    VerUsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioAdmiComponent,
    AlumnosComponent,
    PerfilHistoricoAlumnoComponent,
    InitComponent,
    AdminComponent
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
    LoggerService,
    ExcelService,
    NotificacionesService,
    GuardGuard,
    RoleGuard,
    OtherGuard,
    EncriptadorService,
    WordService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
