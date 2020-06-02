//Author: Ujwal Vikas Chanda, uj225642@dal.ca
import { Component, OnInit } from '@angular/core';
import {ContactUsService} from '../shared/services/support/contactUS.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  mailName:string
  mailEmail:string
  mailBody:string
  //regular expression for email field validation
  re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  conService:any
  constructor(_conService: ContactUsService) {
    this.conService = _conService
   }

  ngOnInit() {
  }

//On Submit contact details
  onSubmit(){

    if(!this.re.test(this.mailEmail)){
      alert("Enter Valid Email Address")
    }else{
      this.conService.contactUS(this.mailName,this.mailEmail,this.mailBody)
    }
  }

}
