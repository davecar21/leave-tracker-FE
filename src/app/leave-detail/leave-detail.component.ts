import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeaveService } from '../shared/leave.service';

@Component({
  selector: 'app-leave-detail',
  templateUrl: './leave-detail.component.html',
  styleUrls: ['./leave-detail.component.scss']
})
export class LeaveDetailComponent implements OnInit {

  // @Input() leaveDetails;
  @Input() selectedDetails;
  @Output() cancelVL = new EventEmitter();

  leaveDetails;

  currentDate = new Date().getTime();

  constructor(private leaveService: LeaveService) {
    this.leaveService.getLeave().subscribe(result => {
      this.leaveDetails = result;
      this.leaveDetails.forEach(data => {
        data.leaveDate = new Date(data.leaveDate);
        data.createdAt = new Date(data.createdAt);
      })
      console.log('from leave Details', this.leaveDetails)
    })
  }

  ngOnInit() {
    console.log('sel', this.selectedDetails)
  }

  initLeaveType(type) {
    if (type == 'SL') {
      return 'Sick Leave'
    }
    if (type == 'VL') {
      return 'Vacation Leave'
    }
    if (type == 'EL') {
      return 'Emergency Leave'
    }
  }

  removeVL(firstName, leaveDate) {
    this.cancelVL.emit({ firstName, leaveDate });
  }
}
