import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appLeaveHighlight]'
})
export class LeaveHighlightDirective implements OnInit {

  @Input() hlLeave;

  constructor(public el: ElementRef) {
  }

  ngOnInit() {
    if(this.hlLeave == 'SL'){
      this.el.nativeElement.style.backgroundColor = '#f39c12';
    }
    if(this.hlLeave == 'VL'){
      this.el.nativeElement.style.backgroundColor = '#27ae60';
    }
    if(this.hlLeave == 'EL'){
      this.el.nativeElement.style.backgroundColor = '#8e44ad';
    }
  }

}
