import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateDJprofilePageRoutingModule } from './create-djprofile-routing.module';

import { CreateDJprofilePage } from './create-djprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreateDJprofilePageRoutingModule
  ],
  declarations: [CreateDJprofilePage]
})
export class CreateDJprofilePageModule {}
