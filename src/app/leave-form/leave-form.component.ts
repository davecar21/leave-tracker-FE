import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TokenService } from '@AUTH/token.service';
import { LeaveService } from '@SHARED/leave.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  @Output() submitLeaveForm = new EventEmitter();

  leaveTypes = [
    { value: 'SL', viewValue: 'Sick Leave' },
    { value: 'VL', viewValue: 'Vacation Leave' },
    { value: 'EL', viewValue: 'Emergency Leave' },
  ];

  leaveForm = new FormGroup({
    leaveApplied: new FormControl(''),
    leaveDate: new FormControl(''),
    leaveType: new FormControl(''),
    leaveHours: new FormControl(''),
    leaveNotes: new FormControl(''),
    leaveDateReturnWork: new FormControl(''),
  });

  constructor(
    private tokenService: TokenService,
    private leaveService: LeaveService
  ) { }

  ngOnInit() {
  }

  submitLeave() {
    const token = this.tokenService.decodeJWT(localStorage.getItem('token'));
    const formValue = this.leaveForm.value;

    formValue.userID = token._id;

    this.submitLeaveForm.emit(formValue);

    this.leaveService.postLeave(formValue).subscribe(
      result => {
        console.log('submit Leave Form SUCESS', result);
      },
      error => {
        console.log('submit Leave Form FAIL', error);
      }
    )


    console.log('submitLeave', formValue);
    // this.leaveForm.reset();
  }

}
