import { Component, OnInit } from '@angular/core';
import { NavController, ModalController} from '@ionic/angular';
// import { Detail } from '../models/detail';
import { MenusService } from '../services/menus.service';
import { Order } from '../models/categories';
import { DetailsModalPage } from '../details-modal/details-modal.page'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

export class OrdersPage implements OnInit {

  Orders:Array<Order>;

  constructor(public navCtrl : NavController,
    private menus:MenusService,
    public modalController: ModalController,
    public alertController: AlertController
    ) {
      this.order();
    // this.details = JSON.parse(localStorage.getItem('details'));
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: 'Cancelacion Exitosa',
      buttons: ['OK']
    });

    await alert.present();
  }

  async openModal(details, ordenNumber, order) {
    const modal = await this.modalController.create({
      component: DetailsModalPage,
      componentProps: {
        "details": details,
        "orderNumber" : ordenNumber,
        "order": order
      }
    });
 
    return await modal.present();
  }

  cancel(id:number, i:number)
  {
    this.menus.cancelOrder(id)
    .then(async data => 
    {
      let index = this.Orders.indexOf(data);
      console.log("index deleted "+index);
      // if (index > -1)
      // {
      //   // this.Orders.splice(i, 1);
      //   this.Orders.splice(index, 1);
      // }

      console.log('before');
      console.log(this.Orders);

      this.Orders = this.Orders.filter(elem => elem.order != id);
      // console.log(i);
      console.log('after');
      console.log(this.Orders);

      await this.presentAlert();
      console.log(data);
      // this.Orders = data.data;

      console.log(this.Orders);
      
    }).catch(error => {
      console.log(error);
    });
  }

  order(){
    this.menus.myOrder()
      .then(async data => 
      {

        console.log(data);
        this.Orders = data.data;
        console.log(this.Orders);

        // localStorage.removeItem('details');

        // await this.presetAlert();
        // this.details = null;

        
      }).catch(error => {
        console.log(error);
        // console.log(error.error.error);
      });
  }

  goToHomePage() {
    // this.navCtrl.navigateForward('home');  
    this.navCtrl.back();  
  }

  ngOnInit() {


  }

}
