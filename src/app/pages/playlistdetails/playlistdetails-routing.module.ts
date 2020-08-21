import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlaylistdetailsPage } from './playlistdetails.page';

const routes: Routes = [
  {
    path: '',
    component: PlaylistdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistdetailsPageRoutingModule {}
