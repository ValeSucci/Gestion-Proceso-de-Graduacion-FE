import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { fillProperties } from '@angular/core/src/util/property';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {
  constructor() { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    
    //worksheet['A1'].s = {fill: {fgColor: {rgb: "dddddd"}}}

    const workbook: XLSX.WorkBook = { Sheets: { 'reporte': worksheet }, SheetNames: ['reporte'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  public saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    const date = new Date();
    let mes = date.getMonth()+1;
    const dateFormat = date.getFullYear()+"-"+(mes.toString().length===1?0+""+mes:mes)+"-"+date.getDate();
    FileSaver.saveAs(data, fileName + dateFormat+ EXCEL_EXTENSION);
//    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}