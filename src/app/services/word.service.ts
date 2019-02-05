import { Injectable } from '@angular/core';
import * as JSZip from 'jszip';
import * as Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { RestapiService } from './restapi.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    public _service: RestapiService,
    public _builder: FormBuilder,
  ) { }

  downloadTutor(alumno) {
    this._service.getGlobal('/carta/get/' + true, '', null).subscribe(data => {
      let mdata: any = data;
      if (!mdata || !mdata.hash || !mdata.tipo) {
        return alert('Error')
      }
      let b = 'data:' + mdata.tipo + ';base64,' + mdata.hash
      let base64 = b.substring(b.indexOf(';base64,') + ';base64,'.length)
      let raw = window.atob(base64)
      let array = new Uint8Array(new ArrayBuffer(raw.length))
      for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i)
      }
      let doc = new Docxtemplater()
      let zip = new JSZip(array)
      doc.loadZip(zip)
      //console.log(doc)
      //*
      let hoy = new Date();
      doc.setData({
        anio: hoy.getFullYear(),
        cite: alumno.cite,
        fecha_dia: hoy.getDate(),
        fecha_mes: this.getMonthSp(hoy.getMonth()),
        nombre_docente: alumno.docente,
        nombre_alumno: alumno.nombre
      })
      try {
        doc.render()
      } catch (error) {
        return alert(error)
      }
      let buf = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      //*
      saveAs(buf, 'carta-tutor-' + alumno.nombre + '.docx')
      //*/
    }, err => {
      console.log(err)
      alert('Error');
    });
  }

  downloadRevisor(alumno) {
    this._service.getGlobal('/carta/get/' + false, '', null).subscribe(data => {
      let mdata: any = data;
      if (!mdata || !mdata.hash || !mdata.tipo) {
        return alert('Error')
      }
      let b = 'data:' + mdata.tipo + ';base64,' + mdata.hash
      let base64 = b.substring(b.indexOf(';base64,') + ';base64,'.length)
      let raw = window.atob(base64)
      let array = new Uint8Array(new ArrayBuffer(raw.length))
      for (let i = 0; i < raw.length; i++) {
        array[i] = raw.charCodeAt(i)
      }
      let doc = new Docxtemplater()
      let zip = new JSZip(array)
      doc.loadZip(zip)
      let hoy = new Date();
      doc.setData({
        anio: hoy.getFullYear(),
        cite: alumno.cite,
        fecha_dia: hoy.getDate(),
        fecha_mes: this.getMonthSp(hoy.getMonth()),
        nombre_docente: alumno.docente,
        nombre_alumno: alumno.nombre,
        tema: '"' + alumno.tema.toUpperCase() + '"'
      })
      try {
        doc.render()
      } catch (error) {
        return alert(error)
      }
      let buf = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      })
      //*
      saveAs(buf, 'carta-revisor-' + alumno.nombre + '.docx')
      //*/
    }, err => {
      console.log(err)
      alert('Error');
    });
  }

  private getMonthSp(month: number) {
    let months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octumbre',
      'Noviembre',
      'Diciembre'
    ];

    return months[month];
  }

}
