import { Component, OnInit } from '@angular/core';
import { MenusService } from '../services/menus.service';
import { Category } from '../models/categories';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  categoriesList:Array<Category>;

  constructor(private navCtrl : NavController,public Menus: MenusService, public MenusService: MenusService) { 
    this.categories();
  }

  ngOnInit() {
  }
  goToProductsPage (category) {
    // console.log(category);
    let param:NavigationExtras={
      queryParams:{
        category:JSON.stringify(category)
      }
    }
    
    this.navCtrl.navigateForward('products', param);
  }
  goToHomePage () {
    this.navCtrl.navigateForward('home');
  }
  categories(){
    this.MenusService.getCategories()
    .then(data => 
    {
      this.categoriesList = data.data;
      console.log(data.data);
    }).catch(error => {
      console.log(error.error.error);
    });
  }

}