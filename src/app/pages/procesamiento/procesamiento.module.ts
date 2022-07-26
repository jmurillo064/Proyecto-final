import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcesamientoPageRoutingModule } from './procesamiento-routing.module';

import { ProcesamientoPage } from './procesamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcesamientoPageRoutingModule
  ],
  declarations: [ProcesamientoPage]
})
export class ProcesamientoPageModule {}
