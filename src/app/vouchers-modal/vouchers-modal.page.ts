import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {CreateVoucherModalPage} from "../create-voucher-modal/create-voucher-modal.page";
import { ThrowStmt } from '@angular/compiler';
import { OrdersService } from "../services/orders.service"
import { wsResponse } from '../models/categories';
import { error } from 'util';

@Component({
  selector: 'app-vouchers-modal',
  templateUrl: './vouchers-modal.page.html',
  styleUrls: ['./vouchers-modal.page.scss'],
})
export class VouchersModalPage implements OnInit {

  vouchersList:Array<any> = new Array<any>();
  order: any;

  constructor(
    private ordersService : OrdersService ,
    private modalController: ModalController,
    private navParams: NavParams
  ) 
  { 
    // console.log(this.vouchers);
  }

  ngOnInit() {
    // this.vouchers = this.navParams.data.vouchers;

    this.order = this.navParams.data.order;
    console.log("voucher-modal enter");
    this.ordersService.getVouchers(this.order.order).then( data => {
      this.vouchersList = data.data;
    }).catch(error => {
      console.log(error);
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: CreateVoucherModalPage,
      componentProps: {
        "orderNumber": this.order.order
      }
    });

    modal.onDidDismiss().then(
      async () => {
        console.log("se cerro el modal de pagar");
        let result = await this.ordersService.getVouchers(this.order.order);
        this.vouchersList = result.data;
      }
    );
  
    return await modal.present();
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
