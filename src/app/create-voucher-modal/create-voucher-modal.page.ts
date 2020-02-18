import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OrdersService } from "../services/orders.service";

@Component({
  selector: 'app-create-voucher-modal',
  templateUrl: './create-voucher-modal.page.html',
  styleUrls: ['./create-voucher-modal.page.scss'],
})
export class CreateVoucherModalPage implements OnInit {

  bank: any = "";
  comments: any = "";
  reference: any = "";
  amount: any = "";
  orderNumber: any;

  constructor(
    private ordersService : OrdersService ,
    private modalController: ModalController,
    private navParams: NavParams
  ) { 
    this.orderNumber = this.navParams.data.orderNumber;
  }

  ngOnInit() {
    console.log("Vista de pagar");
  }

  addVoucher(){
    let data = {
      bank: this.bank,
      comments: this.comments,
      amount: this.amount,
      reference: this.reference
    };
    
    console.log("se llamo el crear voucher")

    this.ordersService.addVouchers(this.orderNumber, data);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
