import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditlistenerprofilePageRoutingModule } from './editlistenerprofile-routing.module';

import { EditlistenerprofilePage } from './editlistenerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditlistenerprofilePageRoutingModule
  ],
  declarations: [EditlistenerprofilePage]
})
export class EditlistenerprofilePageModule {}
