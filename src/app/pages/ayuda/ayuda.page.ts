import { Component, OnInit } from '@angular/core';
import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper';
import { IonicSlides } from '@ionic/angular';
SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom]);

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.page.html',
  styleUrls: ['./ayuda.page.scss'],
})
export class AyudaPage implements OnInit {

  banners: String[] = ['.\assets\icon\C2P3E2.jpg','.\assets\icon\infectada.jpg','.\assets\icon\sana.jpg'];
  
  constructor() { }

  ngOnInit() {
  }

  cardClick(){
    console.log("Funciona");
  }

}
