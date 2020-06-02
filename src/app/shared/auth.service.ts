

//author: Raviteja Kase
//ID: B00823644
import { Injectable } from '@angular/core';
import {User} from './models/user';
import { Observable, throwError } from 'rxjs';

import { catchError, map ,filter, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  id='';
  isAuthorized:boolean;
  constructor(
    private http: HttpClient,
    public router: Router

  ) {
  }

  get userId() {
    return sessionStorage.getItem('id');
  }

  // New User registration
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign in and setting the token in local storage and id in sessionstorage
  signIn(user: User) {
    console.log(user)
    return this.http.post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {

        sessionStorage.setItem('id',res.id);
        sessionStorage.setItem('email',res.email);
        
        console.log(res.id);
        console.log(res.token);
        localStorage.setItem('access_token', res.token)
       
        this.getUserProfile(res.id).subscribe((res) => {
          console.log(res);
          this.id=res.msg.id;
          this.currentUser = res;

          //this.router.navigate(['']);

        })

      },
      (error) => {
        //Error handling for invalid username or password entered
        console.error('error caught in component')

        window.alert("Invalid username or password")
        this.router.navigate(['login']);
      }
      )
  }

  //Get the token set at localstorafe
  getToken() {
    console.log(localStorage.getItem('access_token'));
    return localStorage.getItem('access_token');
  }

//Check whether the user is logged in or not
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }


//Logout Functionality
  doLogout() {
    let removeId=sessionStorage.removeItem('id');
    sessionStorage.removeItem('email');
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['']);
    }
  }
//Remove token
  removeToken(){
    localStorage.removeItem('access_token');
  }
  // Get the user Profile details by Id
  getUserProfile(id): Observable<any> {
    console.log(id);
    let api = 'http://localhost:4000/api/user-profile/'+id;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {

        console.log(res);
        return res || {}

      }),
      catchError(this.handleError)
    )
  }

  //Validate if the email exists or not
  validateEmail(email){
    console.log('http://localhost:4000/api/validateEmail/'+email);
    return this.http
    .get('http://localhost:4000/api/validateEmail/'+email);/* pipe(
      map((response: Response) => response.json()

      ),catchError(this.handleError))  */

}
//To raise request to reset the password
requestReset(body): Observable<any> {
  return this.http.post(`${this.endpoint}/req-reset-password`, body);
}
//Set the password for reset functionality
newPassword(body): Observable<any> {
  return this.http.post(`${this.endpoint}/new-password`, body);
}
//Once the user raises reset password request , a token is generated at client side and it will be validated
ValidPasswordToken(body): Observable<any> {
  return this.http.post(`${this.endpoint}/valid-password-token`, body);
}

//Updating the Bio from profile page
updateBio(id,bio):Observable<any>{
  this.http.put('http://localhost:4000/api/updateBio/'+id+'/'+bio,null).subscribe(res=>{
    console.log(res);
  })
  return this.http.put('http://localhost:4000/api/updateBio/'+id+'/'+bio,null);


}

//Deleting the profile from profile page

deleteProfile(id):Observable<any>{
  this.removeToken();
  return this.http.delete('http://localhost:4000/api/delete-user/'+id);
}
getSubscribers(subscribedTo:String):Observable<any>{
  return this.http.get('http://localhost:4000/api/sub/'+subscribedTo);
}




  // Error handling
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {

      msg = error.error.message;
    } else {

      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
//Error handling functionality for 401 requests
  handleError2(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      if(error.status===401){
        window.alert('Invalid user name or password');
        this.router.navigate(['login']);

      }else{
        console.error("some error happened");
      }
    }
    return throwError(error);
  }
}
