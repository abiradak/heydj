import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DjProfilePageRoutingModule } from './dj-profile-routing.module';

import { DjProfilePage } from './dj-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DjProfilePageRoutingModule
  ],
  declarations: [DjProfilePage]
})
export class DjProfilePageModule {}
