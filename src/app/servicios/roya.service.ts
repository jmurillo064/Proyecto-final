import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoyaService {

  constructor(private http:HttpClient) { }

  predecirRoya(data: any){
    let  url = 'http://jmurillo064.pythonanywhere.com/predecir';
    var formData = new FormData(); 
    formData.append('base64img',data.base64img);
    let params = new HttpParams();
    params.append('base64img',data.base64img);
    return new Promise((resolve, reject) => {
      this.http.post(url,JSON.stringify(data)).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }
}
