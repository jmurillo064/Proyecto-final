import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  
  nombre;
  apellido: any;
  password: any;
  password2: any;
  usuario: any;
  celular: any;
  correo: any;
  pais: any;
  ciudad: any;
  activo = 1;
  tutorial = 1;
  idRoles = 1;

  //para ver la contraseña
  showPassword = false;
  passwordToggleIcon  = 'eye';
  //para ver la contraseña2
  showPassword2 = false;
  passwordToggleIcon2  = 'eye';

  constructor(private personService: PersonaService, 
    public toastController: ToastController,
    public router: Router) { }

  //para ver contraseña función
  togglePassword():void {
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon == 'eye'){
      this.passwordToggleIcon = 'eye-off';
    }else{
      this.passwordToggleIcon = 'eye';
    }
  }

  //para ver contraseña función
  togglePassword2():void {
    this.showPassword2 = !this.showPassword2;

    if(this.passwordToggleIcon2 == 'eye'){
      this.passwordToggleIcon2 = 'eye-off';
    }else{
      this.passwordToggleIcon2 = 'eye';
    }
  }

  ngOnInit() {
  }

  crearUsuario(){
    console.log("Nombre"+this.nombre);
    console.log("apellido"+this.apellido);
    console.log("password"+this.password);
    console.log("password2"+this.password2);
    console.log("password"+this.usuario);
    console.log("celular"+this.celular);
    console.log("correo"+this.correo);
    console.log("pais"+this.pais);
    console.log("ciudad"+this.ciudad);
    if(this.nombre == "" || this.apellido == "" || this.password == "" || this.password2 == "" || this.usuario == "" 
      || this.celular == "" || this.correo == "" || this.pais == "" || this.ciudad == "" || this.nombre == undefined 
      || this.apellido == undefined || this.password == undefined || this.password2 == undefined || this.usuario == undefined 
      || this.celular == undefined || this.correo == undefined || this.pais == undefined || this.ciudad == undefined){
      
        this.mensaje("Hay campos vacíos!!!",'warning');
    }else{
      if(this.password == this.password2){
        if(this.validarEmail(this.correo)==true){
          if(this.validarTelefono(this.celular)==true){
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
              if(data['code']==406){
                this.mensaje(data['mensaje'],'danger');
              }else{
                this.router.navigate(['tabs']);
                this.mensaje(data['mensaje'],'success');
                this.borrar();
              }
              console.log(data);
            }).catch(error =>{
              console.log(error);
            });
          }else{
            this.mensaje("Número telefónico no válido!!!",'warning');
          }
        }else{
          this.mensaje("Correo no válido!!!",'warning');
        }
      }else{
        this.mensaje("Las contraseñas no coinciden!!!",'warning');
      }
    }
  }

  borrar(){
    this.nombre="";
    this.apellido="";
    this.password="";
    this.password2="";
    this.usuario="";
    this.celular="";
    this.correo="";
    this.pais="";
    this.ciudad="";
  }

  async mensaje(msj: string, cl: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      color: cl
    });
    toast.present();
  }

  validarEmail(valor) {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)){
      return true;
    } else {
      return false;
    }
  }

  validarTelefono(valor){
    if(/^[09][0-9]{1,9}$/i.test(valor)){
      return true;
    }else{
      return false;
    }
  }
}
