import { Injectable } from '@angular/core';
import { Notificacion } from '../models/notificacion';
import { RestapiService } from './restapi.service';
import { Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  public notificaciones: Notificacion[];
  public my_data: any;
  public not: any;
  public numNotif: number;

  constructor(public _service: RestapiService) {
    this.notificaciones = [];
    this.not = new Notificacion(0,"","",null,null,false);
    this.numNotif = 0;
  }

  generarNotificaciones() {
    this._service.getGlobal('/Notificacion/getAll', '', '').subscribe(data => {
      console.log(data)
      this.my_data = data;
      let hoy = new Date();
      for (let i in this.my_data) {
        this.not = this.my_data[i];
        if (this.not.visto || this.not.fecha_publicacion) {
          this.notificaciones.push(this.not)
        } else {
          if (this.not.asunto === "Solicitar Prórroga") {
            let laFecha = new Date(this.not.fecha_asunto.toString());
            if (laFecha.getMonth() === 0) {
              laFecha = new Date(laFecha.getFullYear() - 1, 11, 31)
            } else if (laFecha.getMonth() === 6) {
              laFecha = new Date(laFecha.getFullYear(), 5, 30)
            }
            if (laFecha.getFullYear() < hoy.getFullYear() || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() < hoy.getMonth()) || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() === hoy.getMonth() && laFecha.getDate() <= hoy.getDate())) {
              this.not.fecha_publicacion = hoy;
              this._service.putGlobal(this.not, '/Notificacion/update/' + this.not._id, '').subscribe(data => {
                console.log(this.not)
              }), (err) => {
                console.log(err)
              }
              this.notificaciones.push(this.not);
              this.numNotif = this.numNotif+1;
            }
          } else if (this.not.asunto === "Finalización Plazo") {
            let laFecha = new Date(this.not.fecha_asunto.toString());
            if (laFecha.getMonth() === 0) {
              laFecha = new Date(laFecha.getFullYear() - 1, 11, 31)
            } else if (laFecha.getMonth() === 6) {
              laFecha = new Date(laFecha.getFullYear(), 5, 30)
            }
            if (laFecha.getFullYear() < hoy.getFullYear() || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() < hoy.getMonth()) || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() === hoy.getMonth() && laFecha.getDate() <= hoy.getDate())) {
              this.not.fecha_publicacion = hoy;
              this._service.putGlobal(this.not, '/Notificacion/update/' + this.not._id, '').subscribe(data => {
                console.log(this.not)
              }), (err) => {
                console.log(err)
              }
              this.notificaciones.push(this.not);
              this.numNotif = this.numNotif+1;
            }
          } else if (this.not.asunto === "Defensa Interna") {
            let laFecha = new Date(this.not.fecha_asunto.toString());
            laFecha.setDate(laFecha.getDate() - 7);

            if (laFecha.getFullYear() < hoy.getFullYear() || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() < hoy.getMonth()) || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() === hoy.getMonth() && laFecha.getDate() <= hoy.getDate())) {
              this.not.fecha_publicacion = hoy;
              this._service.putGlobal(this.not, '/Notificacion/update/' + this.not._id, '').subscribe(data => {
                console.log(this.not)
              }), (err) => {
                console.log(err)
              }
              this.notificaciones.push(this.not);
              this.numNotif = this.numNotif+1;
            }
          } else if (this.not.asunto === "Defensa Externa") {
            let laFecha = new Date(this.not.fecha_asunto.toString());
            laFecha.setDate(laFecha.getDate() - 14);

            if (laFecha.getFullYear() < hoy.getFullYear() || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() < hoy.getMonth()) || (laFecha.getFullYear() === hoy.getFullYear() && laFecha.getMonth() === hoy.getMonth() && laFecha.getDate() <= hoy.getDate())) {
              this.not.fecha_publicacion = hoy;
              this._service.putGlobal(this.not, '/Notificacion/update/' + this.not._id, '').subscribe(data => {
                console.log(this.not)
              }), (err) => {
                console.log(err)
              }
              this.notificaciones.push(this.not);
              this.numNotif = this.numNotif+1;
            }
          } else if (this.not.asunto === "Solicitar Revisión de Carpeta") {
            this.not.fecha_publicacion = hoy;
            this._service.putGlobal(this.not, '/Notificacion/update/' + this.not._id, '').subscribe(data => {
              console.log(this.not)
            }), (err) => {
              console.log(err)
            }
            this.notificaciones.push(this.not);
            this.numNotif = this.numNotif+1;
          }
        }
        console.log(this.numNotif)
      }
    }, error => {
      console.log(error)
    });
  }

  /*  editar_fecha(fecha, intervalo, dma, separador) {
  
      var separador = separador || "-";
      var arrayFecha = fecha.split(separador);
      var dia = arrayFecha[0];
      var mes = arrayFecha[1];
      var anio = arrayFecha[2];  
     
      var fechaInicial = new Date(anio, mes - 1, dia);
      var fechaFinal = fechaInicial;
      if(dma=="m" || dma=="M"){
        fechaFinal.setMonth(fechaInicial.getMonth()+parseInt(intervalo));
      }else if(dma=="y" || dma=="Y"){
        fechaFinal.setFullYear(fechaInicial.getFullYear()+parseInt(intervalo));
      }else if(dma=="d" || dma=="D"){
        fechaFinal.setDate(fechaInicial.getDate()+parseInt(intervalo));
      }else{
        return fecha;
      }
      dia = fechaFinal.getDate();
      mes = fechaFinal.getMonth() + 1;
      anio = fechaFinal.getFullYear();
    
      dia = (dia.toString().length == 1) ? "0" + dia.toString() : dia;
      mes = (mes.toString().length == 1) ? "0" + mes.toString() : mes;
    
      return dia + "-" + mes + "-" + anio;
    }
  */
  getNotificaciones() {
    this.notificaciones.reverse();
    console.log(this.notificaciones)
    return {notif:this.notificaciones,n: this.numNotif};
  }

  updateVisto(notificacion: any) {
    notificacion.visto = true;
    this._service.putGlobal(notificacion, '/Notificacion/update/' + notificacion._id, '').subscribe(data => {
      console.log(notificacion)
    }), (err) => {
      console.log(err)
    }
  }

  getNumNotif(){
    return this.numNotif;
  }
  
}
