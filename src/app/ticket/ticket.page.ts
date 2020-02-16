import { Component, OnInit } from '@angular/core';
import { NavController, AlertController} from '@ionic/angular';
import { Detail } from '../models/detail';
import { Product } from '../models/categories';

import { MenusService } from '../services/menus.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  // details:Array<Detail>;
  details:Array<Product>;
  total:number = 0;

  constructor(public navCtrl: NavController, 
    private menus:MenusService,
    private alertC:AlertController) 
  { 
    this.details = JSON.parse(localStorage.getItem('details'));
    console.log(this.details);
    if (this.details != null) {
      this.details.forEach(element => {
        // this.total = this.total + element.price * element.quantity;
        this.total = this.total + element.prices[element.size] * element.quantity;
      });
    }
  }

  async presetAlert()
  {
    const alert = await this.alertC.create({
      message:'Pedido realizado con exito',
      buttons:['Aceptar']
    });
    
    await alert.present();
  }

  delete(i:number){
    // this.total = this.total - this.details[i].price * this.details[i].quantity;
    this.details.splice(i, 1);
    
    this.total = 0;
    this.details.forEach(element => {
      this.total = this.total + element.prices[element.size] * element.quantity;
    });
    localStorage.setItem('details',JSON.stringify(this.details));
  }

  cancelAll(){
    this.details.splice(0, this.details.length);
    this.total = 0;
    localStorage.removeItem('details');
  }

  confirm(){
    if (this.details == null) {
      return;
    }

    let orders = new Array<Detail>();

    this.details.forEach(element => {
      let detail = new Detail();
      detail.food_id = element.id;
      detail.quantity = element.quantity;
      detail.size = element.size;
      
      orders.push(detail);
    });

    console.log(orders);
    this.menus.confirmOrder({
      type:"pickup",
      details:orders
    })
      .then(async data => {
        console.log(data);

        localStorage.removeItem('details');

        await this.presetAlert();
        this.details = null;

        // this.presetAlert().then(elem =>
        // {
        //   this.details = null;
        // });

        // localStorage.setItem("token", (data as any).token);
        // console.log((data as any).token);
        // console.log(this.restProvider.dataUser());
        // this.navCtrl.navigateForward('home');
        // console.log(localStorage.getItem("token"));
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
