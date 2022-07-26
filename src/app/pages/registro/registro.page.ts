import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private personService: PersonaService, public toastController: ToastController) { }

  ngOnInit() {
  }

  nombre: string= "";
  apellido: string= "";
  password: string= "";
  usuario: string= "";
  celular: string= "";
  correo: string= "";
  pais: string= "";
  ciudad: string= "";
  activo = 1;
  tutorial = 1;
  idRoles = 1;

  crearUsuario(){
    let array = {
      "nombre":this.nombre,
      "apellido":this.apellido,
      "password":this.password,
      "usuario":this.usuario,
      "celular":this.celular,
      "correo":this.correo,
      "pais":this.pais,
      "ciudad":this.ciudad,
      "activo":this.activo,
      "tutorial":this.tutorial,
      "idRoles":this.idRoles
    }
    this.personService.crearCuenta(array).then(data => {
      this.mensaje(data['mensaje']);
    }).catch(error =>{
    });
  }

  async mensaje(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000
    });
    toast.present();
  }
}
