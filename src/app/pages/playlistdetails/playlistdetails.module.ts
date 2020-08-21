import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistdetailsPageRoutingModule } from './playlistdetails-routing.module';

import { PlaylistdetailsPage } from './playlistdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaylistdetailsPageRoutingModule
  ],
  declarations: [PlaylistdetailsPage]
})
export class PlaylistdetailsPageModule {}
