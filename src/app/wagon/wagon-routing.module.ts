import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WagonPage } from './wagon.page';

const routes: Routes = [
  {
    path: '',
    component: WagonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WagonPageRoutingModule {}
