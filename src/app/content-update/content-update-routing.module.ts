import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentUpdatePage } from './content-update.page';

const routes: Routes = [
  {
    path: '',
    component: ContentUpdatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentUpdatePageRoutingModule {}
