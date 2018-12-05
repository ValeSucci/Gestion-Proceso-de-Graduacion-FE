import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private loged: boolean;
  private _id: string;
  private username: string;
  constructor() { 
    this.loged = false;
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
    this.loged = true;
  }

  logOut() {
    this.loged = false;
  }

  isLoged(){
    return this.loged;
  }

  setUsername(un){
    this.username = un;
  }

  getUsername(){
    return this.username;
  }

}
