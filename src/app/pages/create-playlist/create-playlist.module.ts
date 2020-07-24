import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePlaylistPageRoutingModule } from './create-playlist-routing.module';

import { CreatePlaylistPage } from './create-playlist.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreatePlaylistPageRoutingModule
  ],
  declarations: [CreatePlaylistPage]
})
export class CreatePlaylistPageModule {}
