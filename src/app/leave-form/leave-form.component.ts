import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit {
  @Output() submitLeaveForm = new EventEmitter();

  leaveTypes = [
    { value: 1, viewValue: 'Sick Leave' },
    { value: 2, viewValue: 'Vacation Leave' },
    { value: 3, viewValue: 'Emergency Leave' },
  ];

  leaveForm = new FormGroup({
    firstName: new FormControl('',
      [Validators.maxLength(8)]),
    leaveApplied: new FormControl(''),
    leaveDate: new FormControl(''),
    leaveType: new FormControl(''),
    leaveHours: new FormControl(''),
    leaveNotes: new FormControl(''),
    leaveDateReturnWork: new FormControl(''),
  });

  constructor() { }

  ngOnInit() {
  }

  formatDate(date) {
    let initDate = moment(date).toDate();
    initDate.setHours(0);
    initDate.setMinutes(0);
    initDate.setSeconds(0);
    initDate.setMilliseconds(0);
    return initDate;
  }

  submitLeave() {
    this.leaveForm.value.leaveDate = this.formatDate(this.leaveForm.value.leaveDate);
    this.submitLeaveForm.emit(this.leaveForm.value);
    console.log('submitLeave', this.leaveForm.value);
    this.leaveForm.reset();
  }

}
