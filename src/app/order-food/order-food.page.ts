import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/categories';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-order-food',
  templateUrl: './order-food.page.html',
  styleUrls: ['./order-food.page.scss'],
})
export class OrderFoodPage implements OnInit {

  product:Product;
  ObjectKeys: any;
  size: string;
  // quantity: number = 0;
  quantity: number = 1;
  user:any = JSON.parse(localStorage.getItem('me'));

  constructor(
    private navCtrl : NavController, 
    private route:ActivatedRoute, 
    private router:Router
  ) { 
    this.route.queryParams.subscribe(params=>{
      if (params && params.product) {
        this.product = JSON.parse(params.product);
        this.ObjectKeys = Object.keys(this.product.labels);
        this.size = this.ObjectKeys[0];
      }
    });
  }
  close(){
    this.navCtrl.back();
    // this.
  }

  add()
  {
    // item.quantity = +data.quantity;
    // localStorage.removeItem('details');
    // let list = localStorage.getItem('details');
    let list = localStorage.getItem('details-'+this.user.id);
    
    let details:Array<Product>;

    if (list != null) {
      details = JSON.parse(list);
      console.log(details);
    }else{
      details = new Array<Product>();
    }
    this.product.size = this.size;
    this.product.quantity = this.quantity;
    // console.log(this.product);
    details.push(this.product);
    localStorage.setItem('details-'+this.user.id, JSON.stringify(details));
    this.navCtrl.back();
  }

  ngOnInit() {
  }

  get total() {
    return  this.product.prices[this.size] * this.quantity;
  }

}
