import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaveService } from '../shared/leave.service';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit {

  leaveDetails;

  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth();
  currentDay = this.date.getDate();
  dateNow = new Date(this.currentYear, this.currentMonth, this.currentDay, 0, 0, 0);

  // @Input() leaveDetails;
  @Input() selectedDetails = this.dateNow.getTime();
  @Output() cancelVL = new EventEmitter();

  constructor(private leaveService: LeaveService) {
    this.leaveService.getLeave().subscribe(result => {
      this.leaveDetails = result;
      // this.leaveDetails.forEach(data => {
      //   data.leaveDate = new Date(data.leaveDate);
      //   data.createdAt = new Date(data.createdAt);
      // });

      // this.leaveDetails = leaves.filter(data => {
      //   return data.leaveDate.getTime() === this.dateNow.getTime();
      // });

      console.log('from leave Details', this.leaveDetails);
      // console.log('from leave this.currentDate', this.dateNow);
    });
  }

  ngOnInit() {
    console.log('sel', this.selectedDetails);
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
