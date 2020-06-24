import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatelistenrerprofilePageRoutingModule } from './createlistenrerprofile-routing.module';

import { CreatelistenrerprofilePage } from './createlistenrerprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CreatelistenrerprofilePageRoutingModule
  ],
  declarations: [CreatelistenrerprofilePage]
})
export class CreatelistenrerprofilePageModule {}
