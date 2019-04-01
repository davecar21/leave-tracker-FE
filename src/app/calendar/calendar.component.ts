import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { LeaveService } from "../shared/leave.service";

import * as moment from "moment";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"]
})
export class CalendarComponent implements OnInit {
  // @Input() leaveDetails;
  leaveDetails;
  @Output() currentDayDetail = new EventEmitter();

  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth();
  currentDay = this.date.getDate();
  dateNow = new Date(
    this.currentYear,
    this.currentMonth,
    this.currentDay,
    0,
    0,
    0
  );

  initYear = this.date.getFullYear(); // year
  initMonth = this.date.getMonth(); // month
  initDay = new Date(this.date.getFullYear(), this.initMonth + 1, 0).getDate(); // # of days
  initCurrentDay = this.date.getDate();

  // Weekday
  weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // MONTH
  monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  currentMonthName = this.monthNames[this.initMonth];

  // Calc Day
  monthFirstDayWeekName = new Date(this.initYear, this.initMonth, 1).getDay();
  prevDays = [];
  currDays: any = [{}];
  nextDays = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    this.initDays();
    this.leaveService.getLeave().subscribe(
      result => {
      this.leaveDetails = result;
    },
    error => {
      console.error('GetLeave:',error);
    }
    );
  }

  formatDate(date) {
    const initDate = moment(date).toDate();
    initDate.setHours(0);
    initDate.setMinutes(0);
    initDate.setSeconds(0);
    initDate.setMilliseconds(0);
    return initDate;
  }

  initDays() {
    this.prevDays = [];
    this.currDays = [];
    this.nextDays = [];

    let lastDays =
      new Date(this.initYear, this.initMonth, 0).getDate() -
      this.monthFirstDayWeekName;
    for (let i = 0; i < this.monthFirstDayWeekName; i++) {
      lastDays += 1;
      console.log(lastDays);
      this.prevDays.push(lastDays);
    }

    for (let i = 0; i < this.initDay; i++) {
      const dateObject = {
        month: this.initMonth,
        day: i + 1,
        year: this.initYear,
        date: new Date(this.initYear, this.initMonth, i + 1)
        // date: new Date(this.initYear, this.initMonth, i + 1, 8, 0, 0),
      };
      this.currDays.push(dateObject);
    }

    const nxtDay = 42 - (this.monthFirstDayWeekName + this.initDay);
    for (let i = 0; i < nxtDay; i++) {
      this.nextDays.push(i + 1);
    }
  }

  initDate(direction) {
    if (direction == "next") {
      this.initMonth += 1;
      if (this.initMonth == 12) {
        this.initMonth = 0;
        this.initYear += 1;
      }
    }
    if (direction == "prev") {
      this.initMonth -= 1;
      if (this.initMonth == -1) {
        this.initMonth = 11;
        this.initYear -= 1;
      }
    }

    this.initDay = new Date(this.initYear, this.initMonth + 1, 0).getDate();
    this.monthFirstDayWeekName = new Date(
      this.initYear,
      this.initMonth,
      1
    ).getDay();
    this.initDays();
    this.currentMonthName = this.monthNames[this.initMonth];
  }

  showDayDetails(dayDetails) {
    this.currentDayDetail.emit(dayDetails);
  }

  initLeaveType(type) {
    if (type == "SL") {
      return "SL";
    }
    if (type == "VL") {
      return "VL";
    }
    if (type == "EL") {
      return "EL";
    }
  }
}
