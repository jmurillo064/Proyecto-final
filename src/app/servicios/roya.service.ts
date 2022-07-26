import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoyaService {

  constructor(private http:HttpClient) { }

  predecirRoya(data: any){
    let  url = 'http://jmurillo064.pythonanywhere.com/predecir';
    var formData = new FormData(); 
    formData.append('base64img',data.imagen);
    return new Promise((resolve, reject) => {
      this.http.post(url,formData).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }
}
