import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.page.html',
  styleUrls: ['./administrar-usuarios.page.scss'],
})
export class AdministrarUsuariosPage implements OnInit {

  arrayUsuarios: any = [];
  idU: any;
  nombreU: any;
  apellido: any;
  usuario: any;
  password: any;
  celular: any;
  correo: any;
  pais: any;
  ciudad: any;
  idRoles: any;
  public results = this.arrayUsuarios;

  constructor(
    private personService: PersonaService,
    public alertController: AlertController,
    public toastController: ToastController,
    ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  handleChange(event){
    const query = event.target.value.toLowerCase();
    console.log(this.results);
    //this.results = this.arrayUsuarios.filter(valor => valor.usuario == query);
    this.results = this.arrayUsuarios.filter(d => d.usuario.toLowerCase().indexOf(query) > -1);
    console.log(query);
    console.log(this.results);
  }

  cargarUsuarios(){
    this.personService.traerUsuarios().then(data=>{
      this.arrayUsuarios = data['data'];
      this.results = this.arrayUsuarios;
      console.log(this.arrayUsuarios);
    }).catch(error =>{
      console.log(error);
    });
  }

  editarId(item){
    this.cargarDatosEditar(item);
    this.presentAlertEditar(item);

  }

  cargarDatosEditar(item){
    console.log(item);
    this.idU = item['idPersonas'];
    this.nombreU= item['nombre'];
    this.apellido= item['apellido'];
    this.usuario= item['usuario'];
    this.password= item['password'];
    this.celular= item['celular'];
    this.correo= item['correo'];
    this.pais= item['pais'];
    this.ciudad= item['ciudad'];
    this.idRoles= item['idRoles'];
  }

  eliminarId(id) {
    this.confirmarEliminar(id, 0, 'DESHABILITAR USUARIO', '¿Deseas deshabilitar este usuario?', 'Deshabilitar');
  }

  recuperarId(id) {
    this.confirmarEliminar(id, 1, 'HABILITAR USUARIO', '¿Deseas habilitar este usuario?', 'Habilitar');
  }

  //editar
  async presentAlertEditar(item) {
    const alert = await this.alertController.create({
      header: 'Edite la información deseada',
      //buttons: ['Editar','Cancelar'],
      inputs: [
        {
            label: 'Nombres',
            name: 'nombre',
            type: 'text',
            placeholder: 'Please enter nombre',
            value: this.nombreU
        },
        {
          name: 'apellido',
            type: 'text',
            placeholder: 'Please enter apellido',
            value: this.apellido
        },
        {
          name: 'usuario',
            type: 'text',
            placeholder: 'Please enter usuario',
            value: this.usuario
        },
        {
          name: 'password',
            type: 'password',
            placeholder: 'Please enter password',
            value: this.password
        },
        {
          name: 'celular',
            type: 'text',
            placeholder: 'Please enter celular',
            value: this.celular
        },
        {
          name: 'correo',
            type: 'text',
            placeholder: 'Please enter correo',
            value: this.correo
        },
        {
          name: 'pais',
            type: 'text',
            placeholder: 'Please enter pais',
            value: this.pais
        },
        {
          name: 'ciudad',
            type: 'text',
            placeholder: 'Please enter ciudad',
            value: this.ciudad
        },
        {
          name: 'idRoles',
            type: 'number',
            placeholder: '1-Usuario, 2-Administrador',
            value: this.idRoles
        },
      ],
      buttons:[
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: 'Editar',
          role: 'submit',
          handler: (alertData) => {
            //this.cargarDatosEditar(item);
            console.log(alertData);
            this.personService.actualizarDatos(alertData, this.idU).then(data =>{
              if(data['code']==200){
                this.mensaje(data['mensaje'], "success");
                this.cargarUsuarios();
              }else{
                this.mensaje(data['mensaje'], "warning");
              }
            });
          }
        }
    ]
    });

    await alert.present();
  }

  //eliminar
  async confirmarEliminar(id, valor, hdr, mssg, txt) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: hdr,
      message: mssg,
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
          text: txt,
          id: 'confirm-button',
          handler: () => {
            this.personService.borrarUsuariosLógico(id, valor).then(data =>{
              if(data['code']==200){
                this.mensaje(data['mensaje'], "danger");
                this.cargarUsuarios();
              }else if(data['code']==202){
                this.mensaje(data['mensaje'], "success");
                this.cargarUsuarios();
              }else{
                this.mensaje(data['mensaje'], "warning");
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  //mensaje
  async mensaje(msj: string, colormjs: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      color: colormjs
    });
    toast.present();
  }


}
