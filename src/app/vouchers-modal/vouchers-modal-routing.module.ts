import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VouchersModalPage } from './vouchers-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VouchersModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VouchersModalPageRoutingModule {}
