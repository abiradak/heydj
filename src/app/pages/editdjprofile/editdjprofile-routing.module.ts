import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdjprofilePage } from './editdjprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EditdjprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdjprofilePageRoutingModule {}
