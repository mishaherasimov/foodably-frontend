import {  EmailValidatorDirective } from './../../email-validator.directive';
import { CustomValidators } from './custom-validators';
import { AuthService } from './../../auth.service';
import { Router } from '@angular/router';
import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { NgForm, FormsModule,ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormBuilder, FormGroup,Validators } from "@angular/forms";
import { flatMap } from 'rxjs/operators';


 


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../profile-management.component.scss']
})
export class SignUpComponent implements OnInit {

  //@ViewChild('signUpForm') signUpForm: NgForm;
  signupForm:FormGroup;
  submitted = false;
  emailAlredyExist = "";
  Emailcheck: any;
  onInit;
  

 
  @Output()
  close = new EventEmitter<void>();

  constructor(
    public fb:FormBuilder,
    public authService:AuthService,
    public router: Router,
    public emailValidator:EmailValidatorDirective
   

  ) {
    this.createSignUpForm();
    
    
  }
  
  createSignUpForm(){
    this.signupForm=this.fb.group({
      name:['', Validators.required],
      email:['', Validators.compose ([Validators.required, Validators.email]),this.emailValidator.validateEmailId.bind(this.emailValidator)],
      password:['',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }
  get f() { return this.signupForm.controls; }
  ngOnInit() {
    this.onInit = false;
  }
  

  onClose() {
    this.close.emit();
  }

 


  onSubmit() {
    
    
    this.submitted = true;
    if (this.signupForm.invalid) {
      this.onInit = true;
      return;
  }
  else{

    console.log(this.signupForm.value);
    this.authService.signUp(this.signupForm.value).subscribe((res) => {
      if (res.result) {
        this.signupForm.reset();
        this.router.navigateByUrl('/', {skipLocationChange: true})
        .then(()=>this.router.navigate(['login']));
        this.onClose();
        
        
        //this.router.navigate(['login']);
      }
    })
    //console.log(this.signUpForm);
  }
}
 
}
