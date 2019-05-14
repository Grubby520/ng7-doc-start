import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  @Input() value: number;
  constructor() {
    this.value = 10;
  }

  ngOnInit() {
  }

}
