import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesUserPageRoutingModule } from './reportes-user-routing.module';

import { ReportesUserPage } from './reportes-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesUserPageRoutingModule
  ],
  declarations: [ReportesUserPage]
})
export class ReportesUserPageModule {}
