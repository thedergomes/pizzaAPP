import { Component, OnInit } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
// import { Detail } from '../models/detail';
import { MenusService } from '../services/menus.service';
import { Order } from '../models/categories';
import { DetailsModalPage } from '../details-modal/details-modal.page'
 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

export class OrdersPage implements OnInit {

  Orders:Array<Order>;

  constructor(public navCtrl : NavController,
    private menus:MenusService,
    public modalController: ModalController) {
      this.order();
    // this.details = JSON.parse(localStorage.getItem('details'));
  }

  async openModal(details, ordenNumber) {
    const modal = await this.modalController.create({
      component: DetailsModalPage,
      componentProps: {
        "details": details,
        "orderNumber" : ordenNumber 
      }
    });
 
    return await modal.present();
  }

  cancel(i:number)
  {
    this.menus.cancelOrder(i)
    .then(async data => 
    {
      console.log(data);
      // this.Orders = data.data;

      console.log(this.Orders);
      
    }).catch(error => {
      console.log(error);
    });
  }

  order(){
    // if (this.details == null) {
    //   return;
    // }

    // let orders = new Array<Detail>();

    // this.details.forEach(element => {
    //   let detail = new Detail();
    //   detail.food_id = element.id;
    //   detail.quantity = element.quantity;
      
    //   orders.push(detail);
    // });

    // console.log(orders);
    this.menus.myOrder()
      .then(async data => {
        console.log(data);
        this.Orders = data.data;

        console.log(this.Orders);

        // localStorage.removeItem('details');

        // await this.presetAlert();
        // this.details = null;

        
      }).catch(error => {
        console.log(error);
        // this.error = true;
        // console.log(error.error.error);
      });
  }

  
  goToHomePage() {
    this.navCtrl.navigateForward('home');  
  }

  ngOnInit() {


  }

}
