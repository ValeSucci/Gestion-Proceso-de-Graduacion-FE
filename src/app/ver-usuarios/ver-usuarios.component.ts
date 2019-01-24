import { Component, OnInit } from '@angular/core';
import { RestapiService } from '../services/restapi.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html',
  styleUrls: ['./ver-usuarios.component.css']
})
export class VerUsuariosComponent implements OnInit {


  public users: any;
  public estado: string[];
  constructor(public _service: RestapiService) {
    this.getData();
    //this.users = [{username: 1, nombre: "Nombre1 Nombre2 Apellido1 Apellido2", habilitado: true}];
  }

  ngOnInit() {
  }

  
  getData(){
    this._service.getGlobal('/Usuario/getAll/','','').subscribe(data=>{
      this.users = data;
    }, error=>{
      console.log(error)
    })
  }

  altaOBaja(u: string, index: number){
    //cambiar el estado de habilitado
    this._service.putGlobal({},'/Usuario/updateAltaBaja/'+u,'').subscribe(data=>{

    }, error=>{
      console.log(error)
    })
    this.users[index].habilitado = !this.users[index].habilitado;
  }

}
