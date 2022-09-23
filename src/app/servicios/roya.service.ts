import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoyaService {

  constructor(private http:HttpClient) { }

  predecirRoya(data: any){
    let  url = 'http://approya.pythonanywhere.com/predecir';
   // let  url = 'http://127.0.0.1:5000/predecir';
    var formData = new FormData(); 
    formData.append('base64img',data.base64img);
    formData.append('Altura_planta',data.Altura_planta);
    formData.append('Numero_ramas',data.Numero_ramas);
    formData.append('Nivel_produccion',data.Nivel_produccion);
    formData.append('Plagas',data.Plagas);
    formData.append('Nivel_plagas',data.Nivel_plagas);
    formData.append('Nivel_otras_enfermedades',data.Nivel_otras_enfermedades);
    formData.append('Produccion_gramos',data.Produccion_gramos);
    //let params = new HttpParams();
    //params.append('base64img',data.base64img);
    return new Promise((resolve, reject) => {
      //this.http.post(url,JSON.stringify(data)).subscribe(res => { 
      this.http.post(url,JSON.stringify(data)).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }
}
