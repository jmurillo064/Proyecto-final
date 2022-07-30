import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { RoyaService } from 'src/app/servicios/roya.service';
import { DatosImagenService } from 'src/app/servicios/datos-imagen.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-procesamiento',
  templateUrl: './procesamiento.page.html',
  styleUrls: ['./procesamiento.page.scss'],
})

export class ProcesamientoPage implements OnInit {

  imgURL: any;
  nombre: any;
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @ViewChild('popover') popover;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  isOpen = false;

  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private royaService: RoyaService,
    private loadingCtrl: LoadingController,
    public alertController: AlertController, 
    public toastController: ToastController,
    private datosImagenService: DatosImagenService,
    public router: Router
    ) { }

    presentPopover(e: Event) {
      this.popover.event = e;
      this.isOpen = true;
    }

  ngOnInit() {
    if ((this.platform.is('mobile') && this.platform.is('hybrid')) || this.platform.is('desktop')) {
      this.isDesktop = true;
    }
  }

  

  async getPicture() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt
    });
      //this.procesarImg();
      //this.imgURL = image;
      let im = image['dataUrl'];
      this.nombre = im.replace('data:image/jpeg;base64,','');
      //console.log(this.nombre);
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      this.photo = reader.result.toString();
    };
    reader.readAsDataURL(file);

  }

//procesar imagen
async procesarImg(){
  if(this.nombre == undefined || this.nombre == ""){
    this.mensaje("Hay datos faltantes",'danger');
  }else{
    let dataToSend = {base64img:this.nombre}
  //console.log(this.nombre);
  const loading = await this.loadingCtrl.create({
    message: 'Procesando imagen...',
  });
  await loading.present();

  this.royaService.predecirRoya(dataToSend).then(data => {
    
    loading.dismiss();
    let color;
    //enviar imagen y estado
    let resultado = {
      estado: data['Descripción'],
      imgB64: this.nombre
    }
    this.datosImagenService.senObjectSource(resultado);

    if(data['Descripción']==='SANA'){
      color='success';
      this.router.navigate(['resultado']);
    }else{
      color='danger';
      this.router.navigate(['resultado']);
    }
    this.mensaje('El estado de la imagen es: '+data['Descripción'], color);
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
