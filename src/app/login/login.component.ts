import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    employeeID: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    this.auth.login(this.loginForm.value).subscribe(
      result => {
        let data:any = result;
        localStorage.setItem('token', data.token);
        this.router.navigate(['/leave-form']);

      },
      error => {
        console.log(error)
        localStorage.removeItem('token');
      }
    )
  }

}
