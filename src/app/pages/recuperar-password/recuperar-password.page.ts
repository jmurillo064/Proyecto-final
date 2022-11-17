import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  //datos
  celular: any;
  correo: any;
  usuario: any;
  password: any;
  password2: any;
  //usuarios
  arrayUsuarios: any;
  //datos a validar
  arrayUsuarioValidado: any;
  correoValidar: any;
  celularValidar: any;
  validarPassword: any;

  //para ver la contraseña
  showPassword = false;
  passwordToggleIcon  = 'eye';
  //para ver la contraseña2
  showPassword2 = false;
  passwordToggleIcon2  = 'eye';

  constructor(
    private personService: PersonaService,
    public toastController: ToastController,
    public router: Router 
    ) { }

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
    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.personService.traerUsuarios().then(data=>{
        this.arrayUsuarios = data['data'];
        console.log(this.arrayUsuarios);
    }).catch(error =>{
        console.log(error);
    });
}

  buscarUsuario(){
    if(this.usuario == "" || this.usuario == undefined){
      this.mensaje("Hay campos vacíos!!!",'warning');
    }else{
      this.arrayUsuarioValidado = this.arrayUsuarios.filter(valor => valor.usuario == this.usuario);
      console.log(this.arrayUsuarioValidado);
      if(this.arrayUsuarioValidado.length != 0){
        this.mensaje("Usuario encontrado", "medium");
        this.correoValidar = this.arrayUsuarioValidado[0]['correo'];
        this.celularValidar = this.arrayUsuarioValidado[0]['celular'];
        console.log(this.correoValidar);
        console.log(this.celularValidar);
      }else{
        this.mensaje("El usuario ingresado no existe", "danger");
        this.arrayUsuarioValidado = undefined;
      }
    }
  }

  validarCorreoCelular(){
    if(this.celular == "" || this.correo == "" || this.celular == undefined || this.correo == undefined){
      this.mensaje("Hay campos vacíos!!!",'warning');
    }else{
      if(this.celular == this.celularValidar){
        if(this.correo == this.correoValidar){
          this.mensaje("Correo y celular correctos", "medium");
          this.validarPassword = "correcta";
        }else{
          this.mensaje("Correo incorrecto", "danger");
        }
      }else{
        this.mensaje("Celular incorrecto", "danger");
      }
    }
  }

  cambiarPassword(){
    if(this.password == "" || this.password2 == "" || this.password == undefined || this.password2 == undefined){
      this.mensaje("Hay campos vacíos!!!",'warning');
    }else{
      if(this.password == this.password2){
        let array = {
          "nombre": this.arrayUsuarioValidado[0]['nombre'],
          "apellido": this.arrayUsuarioValidado[0]['apellido'],
          "usuario": this.arrayUsuarioValidado[0]['usuario'],
          "password": this.password,
          "celular": this.arrayUsuarioValidado[0]['celular'],
          "correo": this.arrayUsuarioValidado[0]['correo'],
          "pais": this.arrayUsuarioValidado[0]['pais'],
          "ciudad": this.arrayUsuarioValidado[0]['ciudad'],
          "idRoles": this.arrayUsuarioValidado[0]['idRoles']
        }
        console.log(array);
        this.personService.actualizarDatos(array, this.arrayUsuarioValidado[0]['idPersonas']).then(data =>{
          if(data['code']==200){
            this.mensaje("Contraseña modificada correctamente", "medium");
            this.router.navigate(['tabs']);
          }else{
            this.mensaje("Hubo inconveniente, no se cambió la contraseña", "warning");
            this.router.navigate(['tabs']);
          }
        });
      }else{
        this.mensaje("Las contraseñas no coinciden",'danger');
      }
    }
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
