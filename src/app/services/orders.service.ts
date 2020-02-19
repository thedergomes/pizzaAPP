import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ReservationsPage } from '../reservations/reservations.page';
import { Reservation } from '../models/reservation';
import { wsResponse } from '../models/categories';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiRestURL = ''; 
  constructor(public http: HttpClient) {
    this.apiRestURL = environment.apiRestURL;
   }

  addVouchers(orderID, data) {
    console.log(orderID, data);
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      });
      let options = {headers};
      this.http.post(this.apiRestURL + `orders/${orderID}/vouchers`, JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  getVouchers(orderID) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      });
      let options = {headers};
      this.http.get(this.apiRestURL + `vouchers?filter[order_id]=${orderID}`, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
