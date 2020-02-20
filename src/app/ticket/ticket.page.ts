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
  // details:Array<Product> = new Array<Product>();
  details:Array<any> = new Array<any>();
  total:number = 0;
  user:any = JSON.parse(localStorage.getItem('me'));

  constructor(public navCtrl: NavController, 
    private menus:MenusService,
    private alertC:AlertController) 
  { 
    let list:Array<any> = new Array<any>();

    // localStorage.removeItem('details-'+this.user.id);

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

      var foodsNoClean = [];
  
      categories.forEach(element => 
      {
        let productSameCategory = result2.filter(word => word.category.name == element.name);

        // productSameCategory.forEach(food => {
        //   let sameProducts = productSameCategory.filter(word => word.id == food.id && word.size == food.size);
        //   let newAmount = sameProducts.map(value => value.quantity).reduce(function(acumulador, valorActual){
        //     return acumulador + valorActual
        //   });

        //   console.warn(newAmount);

        //   // let clone = sameProducts[0];
        //   // clone.quantity = newAmount;

        //   // sameProducts[0].quantity = newAmount;
          
        //   // foodsNoClean.push(sameProducts[0]);
        // });

        list.push({
          name: element.name,
          image:element.image,
          // product: [...new Set(foodsNoClean)]
          product: productSameCategory
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

  // delete(i:number){
  //   // this.total = this.total - this.details[i].price * this.details[i].quantity;
  //   this.details.splice(i, 1);
    
  //   this.total = 0;
  //   this.details.forEach(element => {
  //     this.total = this.total + element.prices[element.size] * element.quantity;
  //   });
  //   localStorage.setItem('details-'+this.user.id,JSON.stringify(this.details));
  // }
  delete(i:number, j:number)
  {
    // this.details[i].product[j].splice(j, 1);
    this.details[i].product.splice(j, 1);
    console.log(this.details[i]);

    if (this.details[i].product.length == 0) {
      this.details.splice(i, 1);
    }

    // console.log(this.details[i].length);
    // return;
    
    // this.total = 0;
    // this.details.forEach(element => {
    //   this.total = this.total + element.prices[element.size] * element.quantity;
    // });
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
    this.details.forEach(category => {
      category.product.forEach(product => 
      {
        let detail = new Detail();
        detail.food_id = product.id;
        detail.quantity = product.quantity;
        detail.size = product.size;
        
        orders.push(detail);
      });
    });

    console.log(orders);
    // return;

    this.menus.confirmOrder({
      type:"pickup",
      details:orders
    })
    .then(async data => {
      localStorage.removeItem('details-'+this.user.id);

      await this.presetAlert();
      this.details = [];

    }).catch(error => {
      console.log(error);
    });



    // this.details.forEach(element => {
    //   let detail = new Detail();
    //   detail.food_id = element.id;
    //   detail.quantity = element.quantity;
    //   detail.size = element.size;
      
    //   orders.push(detail);
    // });

    // console.log(orders);
    // this.menus.confirmOrder({
    //   type:"pickup",
    //   details:orders
    // })
    // .then(async data => {
    //   console.log(data);

    //   localStorage.removeItem('details-'+this.user.id);

    //   await this.presetAlert();
    //   this.details = [];

    // }).catch(error => {
    //   console.log(error);
    // });
  }

  goToHomePage() {
    this.navCtrl.navigateForward('home');  
  }

  ngOnInit() {
  }

}
