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
  details:Array<Product> = new Array<Product>();
  total:number = 0;
  user:any = JSON.parse(localStorage.getItem('me'));

  constructor(public navCtrl: NavController, 
    private menus:MenusService,
    private alertC:AlertController) 
  { 
    let list:Array<any> = new Array<any>();
    let result2 = JSON.parse(localStorage.getItem('details-'+this.user.id));
    if (result2 != null) {
      let categories = result2.reduce(function(acc, valorActual, indice, vector){
        let found = acc.find(element => element.name == valorActual.category.name);
        if (found == undefined || found == 0 ) {
          acc.push({
            name:valorActual.category.name,
            image:valorActual.category.image
          });
        }
        return acc;
      }, []);
  
      categories.forEach(element => 
      {
        let productSameCategory = result2.filter(word => word.category.name == element.name);
        list.push({
          name: element.name,
          image:element.image,
          product:productSameCategory
        });
      });

      this.details = list;
    }
    else{
      this.details = [];
    }

    
    console.log("-----------------------------");
    console.log(list);
    console.log("-----------------------------");



    // this.details = JSON.parse(localStorage.getItem('details-'+this.user.id));
    // let result = JSON.parse(localStorage.getItem('details-'+this.user.id));
    // this.details = result != null ? result : [];
    
    // console.log(this.details);
    // if (this.details != null) {
    //   this.details.forEach(element => {
    //     // this.total = this.total + element.price * element.quantity;
    //     this.total = this.total + element.prices[element.size] * element.quantity;
    //   });
    // }
    // console.log(this.details[0]);
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
    localStorage.setItem('details-'+this.user.id,JSON.stringify(this.details));
  }

  cancelAll(){
    this.details.splice(0, this.details.length);
    this.total = 0;
    localStorage.removeItem('details-'+this.user.id);
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

        localStorage.removeItem('details-'+this.user.id);

        await this.presetAlert();
        this.details = [];

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
