import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { combineLatest } from 'rxjs';
import { DatosImagenService } from 'src/app/servicios/datos-imagen.service';
import { RoyaService } from 'src/app/servicios/roya.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {

  imgURL;
  dato_Imagen: any;
  altura_Planta: any;
  numero_Ramas: any;
  nivel_Produccion: any;
  posee_Plagas: any;
  nivel_Plagas: any;
  nivel_OtrasEnfermedades: any;
  produccion_Gramos: any;
  presencia_Roya: any;
  presencia_Roya_Enviar: any;
  nivel_Roya: any;
  datosUsario = JSON.parse(localStorage.getItem('sesionlogin'));

  constructor(
    private datosImagenService: DatosImagenService,
    private router: Router,
    private royaService: RoyaService,
    public alertController: AlertController, 
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.datosImagenService.$getObjectSource.subscribe(data =>{
      this.imgURL = 'data:image/jpeg;base64,'+data['imgB64'];
      this.presencia_Roya = data['estado'];
      if(data['estado']=='SANA'){
        this.presencia_Roya_Enviar = 0;
      }else{
        this.presencia_Roya_Enviar = 1;
      }
      this.nivel_Roya = data['nivel'];
      this.dato_Imagen = data['Nombre_Imagen'];
      this.altura_Planta = data['Altura_planta'];
      this.numero_Ramas = data['Numero_ramas'];
      this.nivel_Produccion = data['Nivel_produccion'];
      this.posee_Plagas = data['Plagas'];
      this.nivel_Plagas = data['Nivel_plagas'];
      this.nivel_OtrasEnfermedades = data['Nivel_otras_enfermedades'];
      this.produccion_Gramos = data['Produccion_gramos'];
    }).unsubscribe();
  }

  guardar(){
    let arrayRegistro = {
      datoImagen: this.dato_Imagen,
      alturaPlanta: this.altura_Planta,
      numeroRamas: this.numero_Ramas,
      nivelProduccion: this.nivel_Produccion,
      poseePlagas: this.posee_Plagas,
      nivelPlagas: this.nivel_Plagas,
      nivelOtrasEnfermedades: this.nivel_OtrasEnfermedades,
      produccionGramos: this.produccion_Gramos,
      presenciaRoya: String(this.presencia_Roya_Enviar),
      nivelRoya: String(this.nivel_Roya),
      idPersona: String(this.datosUsario['id'])
    }
    //
    console.log(arrayRegistro);
    this.royaService.guardarRegistros(arrayRegistro).then(data => {
      if(data['code']==201){
        this.mensaje("Registro guardado correctamente",'success');
        this.router.navigate(['procesamiento']);
      }else{
        this.mensaje("Hubo muchos errores",'warning');
        console.log(data);
      }
    }).catch(error =>{
      this.mensaje("Hubo muchos errores",'warning');
      this.presentAlert(error.message);
      });
    }

    async mensaje(msj: string, colors: string) {
      const toast = await this.toastController.create({
        message: msj,
        duration: 2000,
        color: colors,
        position: 'middle'
      });
      toast.present();
    }
    
    async presentAlert(err) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Alerta',
        subHeader: 'Campos inválidos!!!',
        message: err,
        buttons: ['OK'],
      });
    
      await alert.present();
    
      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
}
