import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OrdersService } from "../services/orders.service";

@Component({
  selector: 'app-create-voucher-modal',
  templateUrl: './create-voucher-modal.page.html',
  styleUrls: ['./create-voucher-modal.page.scss'],
})
export class CreateVoucherModalPage implements OnInit {

  bank: string = "";
  comments: string = "";
  reference: string = "";
  amount: string = "";
  orderNumber: string;

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

    this.ordersService.addVouchers(this.orderNumber, data).then(data => {
      console.log(data)
      this.closeModal(); 
    }).catch(error => {console.log (error)});
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
}
