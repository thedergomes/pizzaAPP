import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiRestURL : string = '';

  constructor(public http: HttpClient){ 
    this.apiRestURL = environment.apiRestURL;
  }

  addUser(data) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
      });
      let options = {headers};
      this.http.post(this.apiRestURL+'register', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  login(data){
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Origin':'*',
        // 'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
        // 'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, DELETE'
      });

//       header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
// header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");
      let options = {headers};
      this.http.post(this.apiRestURL+'login', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  dataUser(){
    // {
    //   "id": 0,
    //   "name": "string",
    //   "email": "string",
    //   "email_verified_at": "Unknown Type: dateTime",
    //   "creatde_at": "Unknown Type: dateTime",
    //   "updated_at": "Unknown Type: dateTime"
    // }
    return new Promise((resolve, reject) => {
      console.log(localStorage.getItem("token"));
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+localStorage.getItem("token")
      });
      let options = {headers};
      this.http.get(this.apiRestURL+'getUser', options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getSecretQuestion(data):Promise<string>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization': 'Bearer '+localStorage.getItem("token")
      });
      let options = {headers};
      this.http.post<string>(this.apiRestURL+'secretQuestion', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  resetPassword(data):Promise<string>
  {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        // 'Authorization': 'Bearer '+localStorage.getItem("token")
      });
      let options = {headers};
      this.http.post<string>(this.apiRestURL+'password/reset', JSON.stringify(data), options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
