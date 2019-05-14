import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
/**
 * Model Driven Forms ?
 */
@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})
export class InputSwitchComponent implements OnInit, OnChanges {
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<any>();
  @Output() changeEvt = new EventEmitter<any>();
  constructor() {
    this.value = false;
   }

  ngOnInit() {

  }

  ngOnChanges() {

  }

  inClick() {
    // 内部逻辑代码
    this.value = !this.value;
    // 类到模板
    this.valueChange.emit(this.value);
    // 模板到类，已是最新的值
    this.changeEvt.emit(this.value);
  }

}
