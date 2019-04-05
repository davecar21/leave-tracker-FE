import { Component, OnInit } from '@angular/core';
import { environment as ENV } from '@ENV';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  date = new Date();
  initYear = this.date.getFullYear(); // year
  initMonth = this.date.getMonth(); // month
  initCurrentDay = this.date.getDate(); // day

  selectedData = {
    date: new Date(this.initYear, this.initMonth, this.initCurrentDay, 8, 0, 0)
  };

  leaveData = [
    {
      firstName: 'Edsel',
      leaveApplied: '03/4/2019',
      leaveDate: new Date(2019, 2, 6, 8),
      leaveType: 2,
      leaveHours: 8,
      leaveNotes: 'Sick Leave',
      leaveDateReturnWork: '03/7/2019'
    },
    {
      firstName: 'Nimrod',
      leaveApplied: '03/24/2019',
      leaveDate: new Date(2019, 2, 25, 8),
      leaveType: 1,
      leaveHours: 8,
      leaveNotes: 'Sick Leave',
      leaveDateReturnWork: '03/26/2019'
    },
    {
      firstName: 'Mikay',
      leaveApplied: '03/24/2019',
      leaveDate: new Date(2019, 2, 25, 8),
      leaveType: 3,
      leaveHours: 8,
      leaveNotes: 'Emergency Leave',
      leaveDateReturnWork: '03/26/2019'
    },
    {
      firstName: 'Tester1',
      leaveApplied: '03/24/2019',
      leaveDate: new Date(2019, 2, 25, 8),
      leaveType: 2,
      leaveHours: 8,
      leaveNotes: 'Vacation Leave',
      leaveDateReturnWork: '03/26/2019'
    },
    {
      firstName: 'Tester2',
      leaveApplied: '03/29/2019',
      leaveDate: new Date(2019, 2, 30, 8),
      leaveType: 1,
      leaveHours: 8,
      leaveNotes: 'Sick Leave',
      leaveDateReturnWork: '03/30/2019'
    },
    {
      firstName: 'Tester3',
      leaveApplied: '03/14/2019',
      leaveDate: new Date(2019, 2, 16, 8),
      leaveType: 2,
      leaveHours: 8,
      leaveNotes: 'Vacation Leave',
      leaveDateReturnWork: '03/17/2019'
    },
    {
      firstName: 'Tester4',
      leaveApplied: '03/17/2019',
      leaveDate: new Date(2019, 2, 17, 8),
      leaveType: 2,
      leaveHours: 8,
      leaveNotes: 'Vacation Leave',
      leaveDateReturnWork: '03/18/2019'
    },
    {
      firstName: 'Tester5',
      leaveApplied: '03/31/2019',
      leaveDate: new Date(2019, 2, 31, 8),
      leaveType: 2,
      leaveHours: 8,
      leaveNotes: 'Vacation Leave',
      leaveDateReturnWork: '03/31/2019'
    }
  ];


  constructor() {
    if (!ENV.production) { console.log('projectENV:' + ENV.envName); }
  }

  ngOnInit() {

  }

  getDayDetail(dayDetail) {
    this.selectedData = {
      date: new Date(dayDetail.year, dayDetail.month, dayDetail.day, 8, 0, 0)
    };
  }

  newLeave(newLeaveData) {
    this.leaveData.push(newLeaveData);
  }

  removeVL(data) {
    const index = this.leaveData.findIndex(leave => {
      return (
        leave.firstName === data.firstName &&
        leave.leaveDate.getTime() === data.leaveDate.getTime()
      );
    });
    this.leaveData.splice(index, 1);
  }
}
