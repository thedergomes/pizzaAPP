import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.page.html',
  styleUrls: ['./promotion.page.scss'],
})
export class PromotionPage implements OnInit {
  constructor(public navCtrl: NavController) {}

  goToHomePage() {
    this.navCtrl.navigateBack('home');
  }

  ngOnInit() {
  }

}
