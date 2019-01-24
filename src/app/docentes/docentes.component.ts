import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';

@Component({
  selector: 'app-docentes',
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent implements OnInit {
  public docentes: any;
  constructor(public _service: RestapiService) {
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this._service.getGlobal('/Docente/getAll/','','').subscribe(data=>{
      this.docentes = data;
    }, error=>{
      console.log(error)
    })
  }


}
