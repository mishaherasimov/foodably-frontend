//Author: Ujwal Vikas Chanda, uj225642@dal.ca
//API integration file with backend

import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {FilterData} from '../../forms/adv-search/filter.model';
import { RequestOptions} from '@angular/http';

@Injectable({
  providedIn: 'root'
})

export class SearchApiService {

  hn:any
  filter:FilterData
constructor( private httpclient: HttpClient) {
  this.hn = window.location.hostname

}

//To get all recipes with specific search keyword
  getAllRecipes(searchID): Observable<any> {
    const subURL="http://"+this.hn+":4000/search/"+searchID;
    return this.httpclient.get(subURL);
  }

//To get author of the specific recipe
  getAuthor(searchID): Observable<any> {
    const subURL="http://"+this.hn+":4000/search/author/"+searchID;
    return this.httpclient.get(subURL);
  }

//Sorted list of recipes in ascending order based on selected field
  getSortedRecipes(searchID,sortOrder): Observable<any> {
    if(sortOrder=="time"){
      const subURL="http://"+this.hn+":4000/search/asc/"+searchID+"/"+sortOrder;
      return this.httpclient.get(subURL);

    }else{
      const subURL="http://"+this.hn+":4000/search/desc/"+searchID+"/"+sortOrder;
      return this.httpclient.get(subURL);
    }
  }

//Advance Search API
  getFilteredRecipes(searchID,data){
    this.filter=data
    console.log(this.filter)
    const subURL="http://"+this.hn+":4000/search/advSearch/"+searchID;
    return this.httpclient.post(subURL,this.filter);
  }

}
