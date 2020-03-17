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

      result2.forEach(food => {
        let sameProducts = result2.filter(word => word.id == food.id && word.size == food.size);
        let newAmount = sameProducts.map(value => value.quantity).reduce(function(acumulador, valorActual){
            return acumulador + valorActual
        });

        foodsNoClean.push({...sameProducts[0], quantity: newAmount});
      });
     
      let mergedElements = [...(new Set(foodsNoClean.map(food => JSON.stringify(food))))].map(element => JSON.parse(element));
  
      categories.forEach(category => 
      {
        let productSameCategory = mergedElements.filter(word => word.category.name == category.name);

        list.push({
          name: category.name,
          image:category.image,
          product: productSameCategory
        });
      });

      this.details = list;
      this.total = this.details.map(category => category.product).flat().map(product => product.prices[product.size] * product.quantity).reduce((acumulador, totalProducto) => acumulador + totalProducto, 0);
    }
    else{
      this.details = [];
    }

  }

  async presetAlert()
  {
    const alert = await this.alertC.create({
      message:'Pedido realizado con exito <br><br> <small>Nota: <br> NO ACEPTAMOS DEVOLUCIÓNES!</small>   ',
      buttons:['Aceptar']
    });
    await alert.present();
  }

  delete(i:number, j:number)
  {

    if(this.details[i].product[j].quantity <= 1){
      this.details[i].product.splice(j, 1);
    }

    if(this.details[i] && this.details[i].product[j] && this.details[i].product[j].quantity > 1){
      this.details[i].product[j].quantity = this.details[i].product[j].quantity - 1;
    }

    if (this.details[i].product.length == 0) {
      this.details.splice(i, 1);
    }

    localStorage.setItem('details-'+this.user.id,JSON.stringify(this.details));
    this.total = this.details.map(category => category.product).flat().map(product => product.prices[product.size] * product.quantity).reduce((acumulador, totalProducto) => acumulador + totalProducto, 0);
  }

  async cancelAll(){
      const alert = await this.alertC.create({
        header: 'Confirme su accion',
        message: 'Seguro que desea limpiar la orden?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Borrar',
            handler: () => {
              this.details.splice(0, this.details.length);
              this.total = 0;
              localStorage.removeItem('details-'+this.user.id);
            }
          }
        ]
      });
  
      await alert.present();
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


    this.menus.confirmOrder({
      type:"pickup",
      details:orders
    })
    .then(async data => {
      localStorage.removeItem('details-'+this.user.id);

      await this.presetAlert();
      this.details = [];

    }).catch(error => {
      console.error(error);
    });
  }

  goToHomePage() {
    this.navCtrl.navigateForward('home');  
  }

  ngOnInit() {
  }

}
