import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { RoyaService } from 'src/app/servicios/roya.service';
import { DatosImagenService } from 'src/app/servicios/datos-imagen.service';
import { Router } from '@angular/router';
//import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Filesystem } from '@capacitor/filesystem';
import { ImageResizer, ImageResizerOptions } from '@awesome-cordova-plugins/image-resizer/ngx';

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}

@Component({
  selector: 'app-procesamiento',
  templateUrl: './procesamiento.page.html',
  styleUrls: ['./procesamiento.page.scss'],
})


export class ProcesamientoPage implements OnInit {

  imgURL: any;
  nombre: any;
  altura_planta: any;
  numero_ramas: any;
  nivel_produccion: any;
  plagas: any;
  nivel_plagas: any;
  nivel_otras_enfermedades: any;
  produccion_gramos: any;
  photo: any

  //interface
  public photos: UserPhoto;

  constructor(
    private royaService: RoyaService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController, 
    public toastController: ToastController,
    private datosImagenService: DatosImagenService,
    public router: Router,
    //private camera: Camera,
    private sanitizer: DomSanitizer,
    private plt: Platform,
    //private imageResizer: ImageResizer
    ) { }

  ngOnInit() {
  }

  // private imageCompressor(base64ImageString: string) {
  //   // this function handles the operation to resize the image from it's original properties
  //   // this function returns base64 string of the resized image
  //   console.log('Image base64 ' + base64ImageString);

  //   let options = {
  //     uri: base64ImageString,
  //     quality: 100,
  //     width: 600,
  //     height: 600,
  //     base64: true
  //   } as ImageResizerOptions;

    
  //     this.imageResizer.resize(options)
  //     .then((info) => console.log(info))
  //     .catch(e => console.log(e));
  // }

  async getPicture() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt,
      quality: 50,
      height: 400,
    });

    console.log(capturedPhoto.webPath);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(capturedPhoto && (capturedPhoto.webPath));
    this.saveImage(capturedPhoto);
  }

  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);
    this.nombre = base64Data.replace('data:image/jpeg;base64,','');
    console.log(this.nombre);
    
}

private async readAsBase64(photo: Photo) {
  if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
          path: photo.path
      });

      return file.data;
  }
  else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
  }
}


  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

borrarDatos(){
  //borrar datos
  this.imgURL = null;
  this.nombre = null;
  this.altura_planta = null;
  this.numero_ramas = null;
  this.nivel_produccion = null;
  this.plagas = null;
  this.nivel_plagas = null;
  this.nivel_otras_enfermedades = null;
  this.produccion_gramos = null;
  this.photo = null;
}

//procesar imagen
async procesarImg(){
  if(this.nombre == undefined || this.nombre == "" || this.altura_planta == undefined || this.altura_planta == ""
  || this.numero_ramas == undefined || this.numero_ramas == "" || this.produccion_gramos == undefined || this.produccion_gramos == ""
  || this.nivel_produccion == undefined || this.plagas == undefined || this.nivel_plagas == undefined || this.nivel_otras_enfermedades == undefined){
    this.mensaje("Hay datos faltantes",'danger');
  }else{
    let dataToSend = {
      base64img:this.nombre,
      Altura_planta: parseFloat(this.altura_planta),
          Numero_ramas: +this.numero_ramas,
          Nivel_produccion: +this.nivel_produccion,
          Plagas: +this.plagas,
          Nivel_plagas: +this.nivel_plagas,
          Nivel_otras_enfermedades: +this.nivel_otras_enfermedades,
          Produccion_gramos: parseFloat(this.produccion_gramos)
    }

    console.log(this.altura_planta);
    console.log(this.numero_ramas);
    console.log(this.nivel_produccion);
    console.log(this.plagas);
    console.log(this.nivel_plagas);
    console.log(this.nivel_otras_enfermedades);
    console.log(this.produccion_gramos);

    const loading = await this.loadingCtrl.create({
    message: 'Procesando datos...',
    });
    await loading.present();

    this.royaService.predecirRoya(dataToSend).then(data => {
    
      loading.dismiss();
      console.log(data);
    if(data['Code']==200){
        let color;
        //enviar imagen y estado
        let resultado = {
          estado: data['Descripción'],
          nivel: data['Nivel'],
          Nombre_Imagen: data['Nombre'],
          imgB64: this.nombre,
          Altura_planta: this.altura_planta,
          Numero_ramas: this.numero_ramas,
          Nivel_produccion: this.nivel_produccion,
          Plagas: this.plagas,
          Nivel_plagas: this.nivel_plagas,
          Nivel_otras_enfermedades: this.nivel_otras_enfermedades,
          Produccion_gramos: this.produccion_gramos
        }
      this.datosImagenService.senObjectSource(resultado);
      this.borrarDatos();

      if(data['Descripción']==='SANA'){
        color='success';
        this.router.navigate(['resultado']);
      }else{
        color='danger';
        this.router.navigate(['resultado']);
      }
      this.mensaje('El estado de la imagen es: '+data['Descripción'], color);

    }else{
      this.mensaje("Hubo muchos errores",'warning');
    }
  }).catch(error =>{
    loading.dismiss();
    this.mensaje("Hubo muchos errores",'warning');
    this.presentAlert(error.message);
    });
  }
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
