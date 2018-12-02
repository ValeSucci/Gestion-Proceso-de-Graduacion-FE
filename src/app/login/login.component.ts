import { Component, OnInit } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { RestapiService } from '../services/restapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private mydata: any
  private un: string
  private pass: string
  constructor(
    private _service: RestapiService,
    private _logger: LoggerService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._service.getGlobal('/Usuario/login', '', this.un + ' ' + this.pass).subscribe(data => {
      this.mydata = data
      this._logger.setID(this.mydata._id)
      console.log("id: " + this._logger.getID)
      this._logger.logIn()
      this._router.navigate(['home'])
    }, error => {
      console.log(error)
    })
  }

}
