import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  emittedDataToCalendar = new EventEmitter();

  constructor() { }

  emitDataToCalendar(token) {
    this.emittedDataToCalendar.emit(token);
  }
}
