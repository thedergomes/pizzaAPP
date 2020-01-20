import { Injectable } from '@angular/core';

/* import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment' */

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
/*   apiRestURL : string = ''; 
  RegisterURL : string = ''; 
 */
/* 
  constructor( public http: HttpClient) { 
    this.apiRestURL = environment.apiRestURL 
  }
   */
/*   public register(input_name: string,input_email:string,input_password:string,input_password2:string): Observable<any>{
    let headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
    });
    let options = { headers: headers };
    let cred = JSON.stringify({"email":input_email,"name":input_name,"password":input_password,"c_password":input_password2});
    return this.http.post<any>(this.apiRestURL + this.RegisterURL, cred, options)
    .pipe(
    retry(1),
    catchError(this.errorHandle)
    );
    }
    errorHandle(error) {
      let errorMsg = ''
      if(error.error instanceof ErrorEvent){
        errorMsg = error.error.message;
      } else {
        errorMsg = 'Error Code => '+`${error.status}`+'\nMessage => '+`${error.message}`;
      }
        return throwError(errorMsg)
      } */
}

