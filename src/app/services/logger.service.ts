import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logged: boolean;
  private _id: string;
  private username: string;
  constructor() { 
    this.logged = true;
    this._id = null;
    this.username = null;
  }

  setID(id){
    this._id = id;
  }

  getID(){
    return this._id;
  }

  logIn() {
    this.logged = true;
  }

  logOut() {
    this.logged = false;
  }

  isLoged(){
    return this.logged;
  }

  setUsername(un){
    this.username = un;
  }

  getUsername(){
    return this.username;
  }

}
