import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { }

  accederlogin(nombre: string, pass: string){
    let  url = 'https://apiserroya.herokuapp.com/api/persona/'+nombre+'/'+pass+'';
      return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    }) 
  }

  crearCuenta(data: any){
    let  url = 'https://apiserroya.herokuapp.com/api/persona';
    var formData = new FormData(); 
    formData.append('nombre',data.nombre);
    formData.append('apellido',data.apellido);
    formData.append('usuario',data.usuario);
    formData.append('password',data.password);
    formData.append('celular',data.celular);
    formData.append('correo',data.correo);
    formData.append('pais',data.pais);
    formData.append('ciudad',data.ciudad);
    formData.append('activo',data.activo);
    formData.append('tutorial',data.tutorial);
    formData.append('idRoles',data.idRoles);
    return new Promise((resolve, reject) => {
      this.http.post(url,formData).subscribe(res => { 
      resolve(res);
        }, error => { 
          reject(error);
        });
    })
  }

}