import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DjmainhomePageRoutingModule } from './djmainhome-routing.module';

import { DjmainhomePage } from './djmainhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DjmainhomePageRoutingModule
  ],
  declarations: [DjmainhomePage]
})
export class DjmainhomePageModule {}
