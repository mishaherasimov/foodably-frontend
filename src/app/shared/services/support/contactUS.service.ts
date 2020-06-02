//Author: Ujwal Vikas Chanda, uj225642@dal.ca
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpClientModule,HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  hn:any
  httpcli:any
constructor( private httpclient: HttpClient) {
  this.hn = window.location.hostname
this.httpcli = httpclient
}

//Send Mail request to API

  contactUS(name,mail,body){
    const subURL="http://"+this.hn+":4000/search/contact/"+name+"/"+mail+"/"+body;
    console.log(subURL)
    return this.httpcli.get(subURL).subscribe(x=> console.log(x))
  }

}
