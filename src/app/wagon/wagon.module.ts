import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WagonPageRoutingModule } from './wagon-routing.module';

import { WagonPage } from './wagon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WagonPageRoutingModule
  ],
  declarations: [WagonPage]
})
export class WagonPageModule {}
