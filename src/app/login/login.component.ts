import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth/auth.service';
import { Router } from '@angular/router';

import { AuthGuardService } from '../shared/services/auth/auth-guard.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    employeeID: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private auth: AuthService,
    private router: Router,
    private authGuard: AuthGuardService) {
    if (this.authGuard) {
      this.router.navigate(['/leave-form']);
    }
  }

  ngOnInit() {
  }

  submitLogin() {
    this.auth.login(this.loginForm.value).subscribe(
      result => {
        const data: any = result;
        localStorage.setItem('token', data.token);
        this.router.navigate(['/leave-form']);

      },
      error => {
        console.log('login',error);
        localStorage.removeItem('token');
      }
    );
  }

}
