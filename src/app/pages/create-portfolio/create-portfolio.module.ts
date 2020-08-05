import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePortfolioPageRoutingModule } from './create-portfolio-routing.module';

import { CreatePortfolioPage } from './create-portfolio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePortfolioPageRoutingModule
  ],
  declarations: [CreatePortfolioPage]
})
export class CreatePortfolioPageModule {}
