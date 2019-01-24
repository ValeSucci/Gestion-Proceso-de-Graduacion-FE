import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  public logged: boolean;
  public _id: string;
  public username: string;
  constructor() { 
    this.logged = true;
    this._id = "5c438254d9e714f25a25ea9c";
    this.username = "ValeSucci";
    //this.logged = false;
    //this._id = null;
    //this.username = null;
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
