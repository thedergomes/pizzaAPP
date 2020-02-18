import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateVoucherModalPageRoutingModule } from './create-voucher-modal-routing.module';

import { CreateVoucherModalPage } from './create-voucher-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateVoucherModalPageRoutingModule
  ],
  declarations: [CreateVoucherModalPage]
})
export class CreateVoucherModalPageModule {}
