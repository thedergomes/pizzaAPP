import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VouchersModalPageRoutingModule } from './vouchers-modal-routing.module';

import { VouchersModalPage } from './vouchers-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VouchersModalPageRoutingModule
  ],
  declarations: [VouchersModalPage]
})
export class VouchersModalPageModule {}
