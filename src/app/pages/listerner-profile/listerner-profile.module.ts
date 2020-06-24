import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListernerProfilePageRoutingModule } from './listerner-profile-routing.module';

import { ListernerProfilePage } from './listerner-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ListernerProfilePageRoutingModule
  ],
  declarations: [ListernerProfilePage]
})
export class ListernerProfilePageModule {}
