import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})

export class InicioPage implements OnInit {

  nombre = ".\assets\icon\infectada.jpg";
  datosUsario = JSON.parse(localStorage.getItem('sesionlogin'));
  user = this.datosUsario['usuario'];
  rol = this.datosUsario['rol'];
  date = new Date().toLocaleString();

  constructor(
    private menu: MenuController,
    public alertController: AlertController, 
    private router: Router
    ) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
    console.log(this.datosUsario);
  }

  //salir
  async confirmarSalida() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '♥ Cerrar sesión ♥',
      message: '¿Deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Salir',
          id: 'confirm-button',
          handler: () => {
            localStorage.removeItem('sesionlogin');
            this.router.navigate(['tabs']);
          }
        }
      ]
    });

    await alert.present();
  }

  exit(){
    this.confirmarSalida();
  }

}
