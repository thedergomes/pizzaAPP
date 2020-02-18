import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {CreateVoucherModalPage} from "../create-voucher-modal/create-voucher-modal.page";

@Component({
  selector: 'app-vouchers-modal',
  templateUrl: './vouchers-modal.page.html',
  styleUrls: ['./vouchers-modal.page.scss'],
})
export class VouchersModalPage implements OnInit {

  vouchers: any;
  order: any;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.vouchers = this.navParams.data.vouchers;
    this.order = this.navParams.data.order;
    console.log(this.vouchers);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateVoucherModalPage,
      componentProps: {
        "orderNumber": this.order.order
      }
    });
  
    return await modal.present();
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
