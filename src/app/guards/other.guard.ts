import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class OtherGuard implements CanActivate, CanActivateChild {

  constructor(
    private _logger: LoggerService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._logger._role) {
      return true;
    } else {
      alert('Necesitas permisos para acceder a esa página.');
    }
  }
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._logger._role) {
      return true;
    } else {
      alert('Necesitas permisos para acceder a esa página.');
    }
  }
}
