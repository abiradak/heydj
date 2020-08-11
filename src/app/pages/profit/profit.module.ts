import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfitPageRoutingModule } from './profit-routing.module';

import { ProfitPage } from './profit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfitPageRoutingModule
  ],
  declarations: [ProfitPage]
})
export class ProfitPageModule {}
