import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditplaylistPageRoutingModule } from './editplaylist-routing.module';

import { EditplaylistPage } from './editplaylist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditplaylistPageRoutingModule
  ],
  declarations: [EditplaylistPage]
})
export class EditplaylistPageModule {}
