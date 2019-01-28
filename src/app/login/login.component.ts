import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { RestapiService } from '../services/restapi.service';
import { Router } from '@angular/router';
import { EncriptadorService } from '../services/encriptador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public mydata: any
  public un: string
  public pass: string
  public userFail: boolean
  public passFail: boolean
  public userDesFail: boolean
  constructor(
    public _service: RestapiService,
    public _logger: LoggerService,
    public _router: Router,
    public _encriptador: EncriptadorService
  ) {
    this.userFail = false;
    this.passFail = false;
    this.userDesFail = false;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userFail = false;
    this.passFail = false;
    this.userDesFail = false;
    let pEnc = this._encriptador.work(this.pass,true);
    this._service.getGlobal('/Usuario/login', '', this.un + ' ' + pEnc).subscribe(data => {
      this.mydata = data
      //console.log()
      //console.log(this.mydata)
      //console.log()
      if (!this.mydata.message) {
        this._logger.setID(this.mydata._id)
        this._logger.setUsername(this.mydata.username)
        this._logger.setRole(this.mydata.role)
        //console.log("id: " + this._logger.getID)
        this._logger.logIn()
        console.log(this.mydata.role)
        if (this.mydata.role) {
          this._router.navigate(['admin'])
        } else {
          this._router.navigate(['home'])
        }
      } else {
        if (this.mydata.message.toString() === 'Usuario inexistente') {
          this.userFail = true;
        } else if (this.mydata.message.toString() === 'Contraseña incorrecta') {
          this.passFail = true;
        } else if (this.mydata.message.toString() === 'Usuario deshabilitado') {
          this.userDesFail = true;
        }
      }

    }, error => {
      console.log(error)
    })
  }

}
