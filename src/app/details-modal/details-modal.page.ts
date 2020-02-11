import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-details-modal',
  templateUrl: './details-modal.page.html',
  styleUrls: ['./details-modal.page.scss'],
})
export class DetailsModalPage implements OnInit {

  details:any;
  total: number = 0;
  orderNumber: number;
 
  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }
 
  ngOnInit() {
    this.details = this.navParams.data.details;
    this.orderNumber = this.navParams.data.orderNumber;


    this.details.forEach(detail => {
       this.total += (detail.food.price * detail.quantity)  
    });
  }
 
  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }
  
}
