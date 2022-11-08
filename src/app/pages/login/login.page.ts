import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { AlertController, ToastController } from '@ionic/angular';
import {Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  pass;
  usuario;

  account = {
    username: 'yajuve',
    fullname: 'Mohamed Raouf',
    email: 'yajuve.25.dz@gmail.com',
    password: 'demodemo'
  };

  // Our translated text strings
  private loginErrorString: string;
  public opt: string = 'signin';

  constructor(
    private personService: PersonaService, 
    public toastController: ToastController, 
    public alertController: AlertController, 
    private router: Router
    ) { }

  ngOnInit() {
  }

  doLogin(){}

  Inilogin(){
        if(this.usuario=="" || this.usuario=="" || this.pass==null || this.pass==""){
            this.mensaje("Datos vacíos!!!", "danger");
          }else{
            this.personService.accederlogin(this.usuario, this.pass).then(data =>{
            if(data['code'] === 404 || data['code']=== 406){
              this.mensaje(data['mensaje'], "warning");
              localStorage.setItem('sesionlogin','false')
            }else{
              if(data['activo'] != 1){
                this.mensaje("Usuario deshabilitado...", "danger");
              }else{
                if(data['tutorial']==1){
                  this.personService.editarUsuariosTutorial(data['id']).catch(error =>{
                  })
                  this.confirmarInicio();
                }else{
                  this.router.navigate(['/inicio']);
                }
                this.mensaje(data['mensaje'], "success");
                this.usuario= data['usuario'];
                localStorage.setItem('sesionlogin', JSON.stringify(data));
              }
            }
        }).catch(error =>{
        })
      }
      this.usuario='';
      this.pass='';
  }

async confirmarInicio() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Iniciar sesión por primera vez',
    subHeader: 'Alerta única, ya no saldrá después',
    message: 'Al ser tu primera vez, serás enviado a la opción de ayuda, para que revises como usar correctamente, solo deberás hacer click en la flecha de la esquina superior izquierda y estarás en el inicio.',
    buttons: [
      {
        text: 'Aceptar y continuar',
        id: 'confirm-button',
        handler: () => {
          this.router.navigate(['/ayuda']);
        }
      }
    ]
  });
  await alert.present();
}

  async mensaje(msj: string, colormjs: string) {
      const toast = await this.toastController.create({
        message: msj,
        duration: 2000,
        color: colormjs
      });
      toast.present();
    }

}
