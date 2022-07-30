import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastController } from '@ionic/angular';
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
            //console.log(data);
          if(data['code'] === 404 || data['code']=== 406){
            this.mensaje(data['mensaje'], "warning");
            localStorage.setItem('sesionlogin','false')
          }else{
            if(data['activo'] != 1){
              this.mensaje("Usuario deshabilitado...", "danger");
            }else{
              this.mensaje(data['mensaje'], "success");
              this.usuario= data['usuario'];
              localStorage.setItem('sesionlogin', JSON.stringify(data));
              this.router.navigate(['/inicio']);
              //console.log(localStorage.getItem('sesionlogin'));
            }
          }
      }).catch(error =>{
      })
    }
    this.usuario='';
    this.pass='';
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
