//author: Raviteja Kase
//ID: B00823644

import { AuthService } from './../../auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { EmailValidatorDirective } from './../../email-validator.directive';


@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['../profile-management.component.scss']
})

//Reset password component
export class RequestResetComponent implements OnInit {
    onInit;
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  

  IsvalidForm = true;
  @Output()
  close = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    public emailValidator:EmailValidatorDirective
   ) {

  }
  onClose() {
    this.router.navigate(['']);
    this.close.emit();
  }

  ngOnInit() {
    this.onInit = false;
    this.RequestResetForm = new FormGroup({
      'email': new FormControl(null, Validators.compose ([Validators.required, Validators.email]),this.emailValidator.validateEmailIdForLogin.bind(this.emailValidator)),
    });
  }

  //requestReset method from authservice is used to achieve this functionality

  RequestResetUser(form) {
    console.log(form)
    if (form.valid) {
        this.onInit = false;
      this.IsvalidForm = true;
      this.authService.requestReset(this.RequestResetForm.value).subscribe(
        data => {
        window.alert("If your emailId is valid a reset password link send to email sucessfully.");
          //this.RequestResetForm.reset();
         
          this.successMessage = " If your emailId is valid a reset password link send to email sucessfully.";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 300);
          this.onClose();
        },
        err => {

          if (err.error.message) {
             
            this.errorMessage = err.error.message;
          }
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}