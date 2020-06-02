import { EmailValidatorDirective } from './../../email-validator.directive';


import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, FormGroup,Validators } from "@angular/forms";
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../profile-management.component.scss']
})
export class LoginComponent implements OnInit {
  onInit;
   signinForm: FormGroup;;
   inValidAuth:boolean;

  @Output()
  close = new EventEmitter<void>();
  @Output()
  signin = new EventEmitter<void>();

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    public emailValidator:EmailValidatorDirective,
    
    
   
    
  ) { 
    this.signinForm = this.fb.group({
      email:['', Validators.compose ([Validators.required, Validators.email]),this.emailValidator.validateEmailIdForLogin.bind(this.emailValidator)],
      password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    })
  }

  ngOnInit() {
    this.onInit = false;
  }

  onClose() {
    this.router.navigate(['']);
    this.close.emit();
  }

  onSubmit() {
    if (this.signinForm.invalid) {
      this.onInit = true;

    }
    else{
    
    this.authService.signIn(this.signinForm.value);
    this.onClose();
    this.router.navigate(['']);
    this.signin.emit();  
  
  }
}
}
