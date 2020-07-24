import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContentUpdatePageRoutingModule } from './content-update-routing.module';

import { ContentUpdatePage } from './content-update.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ContentUpdatePageRoutingModule
  ],
  declarations: [ContentUpdatePage]
})
export class ContentUpdatePageModule {}
