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

  guardarRegistros(data: any){
    let  url = 'https://api-roya.herokuapp.com/api/registro';
    var formData = new FormData();
    formData.append('datoImagen',data.datoImagen);
    formData.append('alturaPlanta',data.alturaPlanta);
    formData.append('numeroRamas',data.numeroRamas);
    formData.append('nivelProduccion',data.nivelProduccion);
    formData.append('poseePlagas',data.poseePlagas);
    formData.append('nivelPlagas',data.nivelPlagas);
    formData.append('nivelOtrasEnfermedades',data.nivelOtrasEnfermedades);
    formData.append('produccionGramos',data.produccionGramos);
    formData.append('presenciaRoya',data.presenciaRoya);
    formData.append('nivelRoya',data.nivelRoya);
    formData.append('idPersona',data.idPersona);
    return new Promise((resolve, reject) => {
      this.http.post(url, formData).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }

  traerRegistros(){
    let  url = 'https://api-roya.herokuapp.com/api/registro';
      return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    }) 
  }

  traerRegistrosUsuario(id){
    let  url = 'https://api-roya.herokuapp.com/api/registro/'+id;
      return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    }) 
  }

}
