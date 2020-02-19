import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {VouchersModalPage} from "../vouchers-modal/vouchers-modal.page";

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.page.html',
  styleUrls: ['./details-modal.page.scss'],
})
export class DetailsModalPage implements OnInit {

  details:any;
  total: number = 0;
  orderNumber: number;
  order:any;
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }
 
  ngOnInit() {
    this.details = this.navParams.data.details;
    this.orderNumber = this.navParams.data.orderNumber;
    this.order = this.navParams.data.order;


    this.details.forEach(detail => {
       this.total += (detail.food.price * detail.quantity)  
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: VouchersModalPage,
      componentProps: {
        "vouchers": this.order.vouchers,
        "order": this.order
      }
    });
  
    return await modal.present();
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  
}


