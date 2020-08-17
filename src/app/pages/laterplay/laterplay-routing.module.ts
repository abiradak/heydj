import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaterplayPage } from './laterplay.page';

const routes: Routes = [
  {
    path: '',
    component: LaterplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaterplayPageRoutingModule {}
