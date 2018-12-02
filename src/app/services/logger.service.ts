import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private loged: boolean;
  private _id: string;
  constructor() { 
    this.loged = false;
    this._id = null;
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


}
