import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainhomePageRoutingModule } from './mainhome-routing.module';

import { MainhomePage } from './mainhome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MainhomePageRoutingModule
  ],
  declarations: [MainhomePage]
})
export class MainhomePageModule {}
