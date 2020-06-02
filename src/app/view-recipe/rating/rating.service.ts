//@author : SNEHA JAYAVARDHINI

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RatingService {
  usrId: string;
  recipeId: string;
  constructor(private http: HttpClient) { }
  
  //sends the rating to the server
  onRate(starrate) {
    this.usrId = '5e7fe19b39d9462c9c04fcd5';
    this.recipeId = '5e81797306006038ad4e3c90';
    const ratingData = {
      rate: starrate,
      recipeId: this.recipeId,
      userId : this.usrId,
    };
    this.http.post<Comment>(`http://localhost:4000/rating/`,
      ratingData
      , {
        headers: new  HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).toPromise()
      .then(data => {
        console.log(data);
      }).catch(err => console.log(err));
  }
  //updates the rating given by the user
  onRateUpdate(starrate) {
    console.log('entered');
    const data = {
      id: '5e8671df34ec2d48c459549d',
      rate: starrate,
    };
    console.log(data);
    return this.http.put('http://localhost:4000/rating/', data );
  }
}
