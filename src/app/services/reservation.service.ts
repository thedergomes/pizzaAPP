import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ReservationsPage } from '../reservations/reservations.page';
import { Reservation } from '../models/reservation';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  apiRestURL = ''; 
  constructor(public http: HttpClient) {
    this.apiRestURL = environment.apiRestURL;
   }

   getReservation():Promise<Array<Reservation>>
   {
     console.log(localStorage.getItem('token'));
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'Authorization': 'Bearer '+localStorage.getItem('token')
        });
        let options = {headers};
        this.http.get<Array<Reservation>>(this.apiRestURL+'reservations',options)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }
  addReservation(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem('token')
      });
      let options = {headers};
      this.http.post(this.apiRestURL+'reservations',JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
}
