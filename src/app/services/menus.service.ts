import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { wsResponse, Category, Product, Order } from '../models/categories';
import { promise } from 'protractor';
import { Detail } from '../models/detail';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  apiRestURL : string = '';

  constructor(public http: HttpClient){ 
    this.apiRestURL = environment.apiRestURL;
  }

  getCategories(): Promise<wsResponse<Category>>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      });
      let options = {headers};
      this.http.get<wsResponse<Category>>(this.apiRestURL+'categories', options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getProductsByCategory(categoryId:number):Promise<wsResponse<Product>>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      });
      let options = {headers};
      this.http.get<wsResponse<Product>>(this.apiRestURL+'foods?filter[category]='+categoryId, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  myOrder():Promise<wsResponse<Order>>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      });
      let options = {headers};
      this.http.get<wsResponse<Order>>(this.apiRestURL+'orders', options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  confirmOrder(body:Array<Detail>):Promise<Order>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      });
      let options = {headers};
      this.http.post<Order>(this.apiRestURL+'orders', 
      { 
        type:'pickup',
        details:body 
      }, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
