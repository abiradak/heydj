import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListernerProfilePage } from './listerner-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ListernerProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListernerProfilePageRoutingModule {}
