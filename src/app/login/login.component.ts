import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@AUTH/auth.service';
import { Router } from '@angular/router';

import { AuthGuardService } from '@AUTH/auth-guard.service';
import { EventEmitterService } from '@SERVICES/event-emitter.service';
import { TokenService } from '@AUTH/token.service';


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
    private authGuard: AuthGuardService,
    private tokenService: TokenService,
    private eventEmitterService: EventEmitterService) {
    if (this.authGuard) {
      this.router.navigate(['/leave-form']);
    }
  }

  ngOnInit() {
    this.eventEmitterService.emitDataToCalendar('');
  }

  submitLogin() {
    this.auth.login(this.loginForm.value).subscribe(
      result => {
        const data: any = result;
        localStorage.setItem('token', data.token);
        const tokenData = this.tokenService.decodeJWT(this.tokenService.getToken());
        this.eventEmitterService.emitDataToCalendar(tokenData._id);
        if (tokenData.userType == 'teamLead') {
          this.router.navigate(['/tesdas']);
        }
        if (tokenData.userType == 'teamMember') {
          this.router.navigate(['/leave-form']);
        }

      },
      error => {
        console.log('login', error);
        localStorage.removeItem('token');
      }
    );
  }

}
