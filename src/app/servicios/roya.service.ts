import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoyaService {

  constructor(private http:HttpClient) { }

  predecirRoya(data: any){
    let  url = 'http://approya.pythonanywhere.com/predecir';
    //let  url = 'http://jmurillo064.pythonanywhere.com/predecir';
    return new Promise((resolve, reject) => {
      //this.http.get(url).subscribe(res => { 
      this.http.post(url,JSON.stringify(data)).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }
}
