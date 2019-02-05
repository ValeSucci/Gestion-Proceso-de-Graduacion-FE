import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
  public url: string
  public valor: string
  constructor(public _http: HttpClient) {
    this.url = 'http://skynet.lp.upb.edu:7870'
    //this.url = 'http://admi.lp.upb.edu:7870'
  }

  public getGlobal<Object>(urlMethod: string, token: string, param: string) {
    console.log(this.url + urlMethod)
    return this._http.get<Object>(this.url + urlMethod, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token),
      params: new HttpParams().set('param', param)
    })
  }

  public postGlobal<Object>(object: any, urlMethod: string, token: string) {
    this.valor = JSON.stringify(object)
    return this._http.post<Object>(this.url + urlMethod, this.valor, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token)
    })
  }

  public deleteGlobal<Object>(code: string, urlMethod: string, token: string) {
    return this._http.delete<Object>(this.url + urlMethod + code, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token)
    })
  }

  public putGlobal<Object>(object: any, urlMethod: string, token: string) {
    this.valor = JSON.stringify(object)
    return this._http.put<Object>(this.url + urlMethod, this.valor, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('token', token)
    })
  }
}
