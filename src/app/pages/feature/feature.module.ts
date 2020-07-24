import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeaturePageRoutingModule } from './feature-routing.module';

import { FeaturePage } from './feature.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeaturePageRoutingModule
  ],
  declarations: [FeaturePage]
})
export class FeaturePageModule {}
