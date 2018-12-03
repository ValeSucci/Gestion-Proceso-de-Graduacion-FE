import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ver-docente',
  templateUrl: './ver-docente.component.html',
  styleUrls: ['./ver-docente.component.css']
})
export class VerDocenteComponent implements OnInit {
  private lastCodigo: number;
  private lastNombre: string;
  private lastDireccion: string;
  private lastTelefono: number;
  private lastCorreo: string;
  private my_data: any;
  constructor(private _service: RestapiService, private _route: ActivatedRoute) {
    this.lastCodigo = parseInt(_route.snapshot.paramMap.get('codigo'));
    this.getData();
  }

  ngOnInit() {
  }

  getData(){
    this._service.getGlobal('/Docente/get/'+this.lastCodigo,'','').subscribe(data=>{
      this.my_data = data;
      this.lastNombre = this.my_data.nombre;
      this.lastDireccion = this.my_data.direccion;
      this.lastTelefono = this.my_data.telefono;
      this.lastCorreo = this.my_data.correo;
    }, error=>{
      console.log(error)
    })
  }


}
