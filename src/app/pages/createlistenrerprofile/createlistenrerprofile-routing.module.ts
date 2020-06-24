import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatelistenrerprofilePage } from './createlistenrerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: CreatelistenrerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatelistenrerprofilePageRoutingModule {}
