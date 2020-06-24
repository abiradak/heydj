import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateDJprofilePage } from './create-djprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CreateDJprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateDJprofilePageRoutingModule {}
