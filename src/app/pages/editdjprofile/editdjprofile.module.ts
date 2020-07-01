import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdjprofilePageRoutingModule } from './editdjprofile-routing.module';

import { EditdjprofilePage } from './editdjprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    EditdjprofilePageRoutingModule
  ],
  declarations: [EditdjprofilePage]
})
export class EditdjprofilePageModule {}
