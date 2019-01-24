import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public logged: boolean;
  public _id: string;
  public username: string;
  public _role: boolean;
  constructor() {
    this.logged = false;
    this._id = null;
    this.username = null;
    this._role = false;
  }

  setID(id) {
    this._id = id;
  }

  getID() {
    return this._id;
  }

  logIn() {
    this.logged = true;
  }

  logOut() {
    this.logged = false;
    this._role = false;
  }

  isLoged() {
    return this.logged;
  }

  setRole(role) {
    this._role = role;
  }

  getRole() {
    return this._role;
  }

  setUsername(un) {
    this.username = un;
  }

  getUsername() {
    return this.username;
  }

}
