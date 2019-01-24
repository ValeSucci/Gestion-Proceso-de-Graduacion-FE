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
  public mydata: any
  public un: string
  public pass: string
  constructor(
    public _service: RestapiService,
    public _logger: LoggerService,
    public _router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this._service.getGlobal('/Usuario/login', '', this.un + ' ' + this.pass).subscribe(data => {
      this.mydata = data
      //console.log()
      //console.log(this.mydata)
      //console.log()
      this._logger.setID(this.mydata._id)
      this._logger.setUsername(this.mydata.username)
      this._logger.setRole(this.mydata.role)
      //console.log("id: " + this._logger.getID)
      this._logger.logIn()
      console.log(this.mydata.role)
      if(this.mydata.role){
        this._router.navigate(['admin'])
      }else{
        this._router.navigate(['home'])
      }
    }, error => {
      console.log(error)
    })
  }

}
