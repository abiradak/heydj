import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NowplayPageRoutingModule } from './nowplay-routing.module';

import { NowplayPage } from './nowplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NowplayPageRoutingModule
  ],
  declarations: [NowplayPage]
})
export class NowplayPageModule {}
