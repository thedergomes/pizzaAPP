import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

import { Category, Product } from '../models/categories';
import { MenusService } from '../services/menus.service';

import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Detail } from '../models/detail';
// import { DetailsModalPage } from '../details-modal/details-modal.page';
// import { OrderFoodPage } from '../order-food/order-food.page';
import { NavigationExtras } from '@angular/router';



@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  category:Category;
  products:Array<Product>;

  constructor(
    private navCtrl : NavController, 
    private route:ActivatedRoute, 
    private router:Router, 
    private menus:MenusService,
    public modalController: ModalController,
    private  alertController: AlertController) {
    this.route.queryParams.subscribe(params=>{
      if (params && params.category) {
        this.category = JSON.parse(params.category);
        this.getProducts();
      }
    });
   }

  // async presentModal(item:Product) {
  //   const modal = await this.modalController.create({
  //     component: DetailsModalPage,
  //     componentProps: {
  //       'data': item
  //     }
  //   });
  //   return await modal.present();
  // }

  goToMenuPage () {
    this.navCtrl.navigateBack('menu');
  }

  async presentAlert(item) {
    let param:NavigationExtras={
      queryParams:{
        product:JSON.stringify(item)
      }
    }

    this.navCtrl.navigateForward('order-food', param);
  }

  getProducts() {
    this.menus.getProductsByCategory(this.category.id)
    .then(data => {
      console.log("then");
      console.log(data);
      // console.log("------");
      // console.log(data.data[0].labels);
      this.products = data.data;

      // localStorage.setItem("token", (data as any).token);
      // console.log((data as any).token);
      // console.log(this.restProvider.dataUser());
      // this.navCtrl.navigateForward('home');
      // console.log(localStorage.getItem("token"));
    }).catch(error => {
      // this.errores = error.error.error;
      console.log(error.error.error);
    });
  }

  ngOnInit() {
  }
}
