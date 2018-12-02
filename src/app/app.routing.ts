import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { CrearDocenteComponent } from './crear-docente/crear-docente.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'crear-docente', component: CrearDocenteComponent },
  { path: 'crear-alumno', component: CrearAlumnoComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);