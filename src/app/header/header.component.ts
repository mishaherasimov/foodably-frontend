import { Router } from '@angular/router';
import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn = false;

  isLoginOpened = false;
  isSignUpOpened = false;

  constructor(
    public authService:AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.isLoginOpened = !this.isLoginOpened;
  }

  onSignUp() {
   
    this.isSignUpOpened = !this.isSignUpOpened;
  }
  logout() {
    this.authService.doLogout();
    this.router.navigate(['']);
  }

  onUserSubmit() {
    this.isLoginOpened = false;
    this.isUserLoggedIn = true;
  }
  onProfile(){
    this.router.navigate(['profile']);
  }
}
