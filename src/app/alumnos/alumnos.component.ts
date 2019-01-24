import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  public alumnos: any;
  constructor(public _service: RestapiService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this._service.getGlobal('/Alumno/getAll/','','').subscribe(data=>{
      this.alumnos = data;
    }, error=>{
      console.log(error)
    })
  }

}
