import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DjProfilePage } from './dj-profile.page';

const routes: Routes = [
  {
    path: '',
    component: DjProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DjProfilePageRoutingModule {}
