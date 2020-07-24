import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeaturePage } from './feature.page';

const routes: Routes = [
  {
    path: '',
    component: FeaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturePageRoutingModule {}
