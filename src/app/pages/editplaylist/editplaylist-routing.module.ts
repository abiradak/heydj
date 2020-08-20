import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditplaylistPage } from './editplaylist.page';

const routes: Routes = [
  {
    path: '',
    component: EditplaylistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditplaylistPageRoutingModule {}
