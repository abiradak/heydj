import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditlistenerprofilePage } from './editlistenerprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditlistenerprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditlistenerprofilePageRoutingModule {}
