import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateVoucherModalPage } from './create-voucher-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreateVoucherModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateVoucherModalPageRoutingModule {}
