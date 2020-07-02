import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DjmainhomePage } from './djmainhome.page';

const routes: Routes = [
  {
    path: '',
    component: DjmainhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DjmainhomePageRoutingModule {}
