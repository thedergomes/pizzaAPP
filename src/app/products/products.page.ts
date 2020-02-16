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
  // async presentModal(item:Product) {
  //   const modal = await this.modalController.create({
  //     component: ModalPage
  //   });
  //   return await modal.present();
  // }

  async presentAlert(item:Product) {
    let param:NavigationExtras={
      queryParams:{
        product:JSON.stringify(item)
      }
    }

    this.navCtrl.navigateForward('order-food', param);

  //   const alert = await this.alertController.create({
  //     header: item.name,
  //     // subHeader: 'Subtitle',
  //     message: '<span class="details"> Ingredientes: </span>'
  //             +'<br> - Detalle 1'
  //             +'<br> - Detalle 2'
  //             +'<br> - Detalle 3'
  //             +'<br> - Detalle 4'
  //             +'<br> <span class="gordito"> HOLAAAA GORDITO! xD </span>'
  //             +'<br> <span class="price1"> <span class="price2">Precio:<span>' +item.price+'</span>',
  // /*     message: 'Precio: '+item.price+'<br>'+'Detalles:', */
  //     cssClass:'alert-product',
  //     inputs:[
  //       {
  //         name:'quantity',
  //         type:'number',
  //         placeholder:'Cantidad',

  //       }
  //     ], 
  //     buttons:[
  //       {
  //         text:'Cancelar',
  //         role:'cancel',
  //         cssClass:'button-cancel'
  //       },
  //       {
  //         text:'Agregar',
  //         cssClass:'button-success',
  //         handler:function(data){
  //           console.log(data);
  //           // console.log((data.quantity as number)*parseFloat(item.price));
  //           console.log(data.quantity * item.price);

  //           item.quantity = +data.quantity;
  //           let list = localStorage.getItem('details');
  //           let details:Array<Product>;

  //           if (list != null) {
  //             details = JSON.parse(list);
  //             console.log(details);
  //           }else{
  //             details = new Array<Product>();
  //           }
  //           details.push(item);
  //           // localStorage.removeItem('details');
  //           localStorage.setItem('details', JSON.stringify(details));

  //           // let detail = new Detail();
  //           // detail.food_id = item.id;
  //           // detail.quantity = (data.quantity as number);
  //           // let list = localStorage.getItem('details');
  //           // console.log(list);
  //           // let details:Array<Detail>;
  //           // if (list != null) {
  //           //   details = JSON.parse(list);
  //           // }else{
  //           //   details = new Array<Detail>();
  //           // }
  //           // details.push(detail);

  //           // localStorage.setItem('details', JSON.stringify(details));
  //           // console.log(localStorage.getItem('details'));
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
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
