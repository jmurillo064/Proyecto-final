import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosImagenService } from 'src/app/servicios/datos-imagen.service';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {

  imgURL;
  estado: any;

  constructor(
    private datosImagenService: DatosImagenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.datosImagenService.$getObjectSource.subscribe(data =>{
      this.imgURL = 'data:image/jpeg;base64,'+data['imgB64'];
      this.estado = data['estado']
    }).unsubscribe();
  }

  guardar(){
    this.router.navigate(['procesamiento']);
  }
}
