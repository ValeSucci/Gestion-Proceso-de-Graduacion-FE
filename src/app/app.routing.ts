import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { ActualizarDocenteComponent } from './actualizar-docente/actualizar-docente.component';
import { VerDocenteComponent } from './ver-docente/ver-docente.component';
import { DocentesComponent } from './docentes/docentes.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crear-docente', component: CrearDocenteComponent },
  { path: 'crear-alumno', component: CrearAlumnoComponent },
  { path: 'actualizar-docente/:codigo', component: ActualizarDocenteComponent },
  { path: 'ver-docente/:codigo', component: VerDocenteComponent },
  { path: 'docentes', component: DocentesComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);