import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NowplayPage } from './nowplay.page';

const routes: Routes = [
  {
    path: '',
    component: NowplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NowplayPageRoutingModule {}
