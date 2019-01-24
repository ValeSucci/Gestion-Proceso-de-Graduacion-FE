import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate, CanActivateChild {
  constructor(
    private _logger: LoggerService,
    private _router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._logger.isLoged()) {
      return true;
    } else {
      this._router.navigate(['/home']);
      alert('Necesitas permisos para acceder a esa página.');
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._logger.isLoged()) {
      return true;
    } else {
      //this._router.navigate(['/home']);
      alert('Necesitas permisos para acceder a esa página.');
    }
  }
}
