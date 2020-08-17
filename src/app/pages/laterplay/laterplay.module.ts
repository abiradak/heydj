import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaterplayPageRoutingModule } from './laterplay-routing.module';

import { LaterplayPage } from './laterplay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaterplayPageRoutingModule
  ],
  declarations: [LaterplayPage]
})
export class LaterplayPageModule {}
