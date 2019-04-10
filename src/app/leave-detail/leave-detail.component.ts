import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { LeaveService } from '@SHARED/services/leave.service';
import { TokenService } from '@AUTH/token.service';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit, OnChanges {

  leaveDetails;

  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth();
  currentDay = this.date.getDate();
  dateNow = new Date(this.currentYear, this.currentMonth, this.currentDay, 0, 0, 0);

  // @Input() leaveDetails;
  @Input() selectedDetails;
  @Output() cancelVL = new EventEmitter();

  constructor(
    private leaveService: LeaveService,
    private tokenService: TokenService) {
  }

  ngOnChanges() {
    console.log('OnChanges', this.selectedDetails)
  }

  ngOnInit() {
    if (this.tokenService.getToken() == null || this.tokenService.decodeJWT(this.tokenService.getToken()).userType == 'teamLead') {
      this.getLeave();
    } else {
      this.getLeaveById(this.tokenService.decodeJWT(this.tokenService.getToken())._id);
    }
    console.log('sel', this.selectedDetails);
  }

  getLeave() {
    this.leaveService.getLeave().subscribe(
      result => {
        this.leaveDetails = result;
      },
      error => {
        console.error('GetLeave:', error);
      }
    );
  }

  getLeaveById(id) {
    this.leaveService.getLeaveById(id).subscribe(
      result => {
        this.leaveDetails = result;
      },
      error => {
        console.error('GetLeave:', error);
      }
    );
  }

  initLeaveType(type) {
    if (type == 'SL') {
      return 'Sick Leave';
    }
    if (type == 'VL') {
      return 'Vacation Leave';
    }
    if (type == 'EL') {
      return 'Emergency Leave';
    }
  }

  removeVL(firstName, leaveDate) {
    this.cancelVL.emit({ firstName, leaveDate });
  }
}
