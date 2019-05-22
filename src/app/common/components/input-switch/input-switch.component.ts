import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-switch',
  templateUrl: './input-switch.component.html',
  styleUrls: ['./input-switch.component.scss']
})

export class InputSwitchComponent {
  @Input() value: boolean;
  @Output() valueChange = new EventEmitter<any>(); // 双向数据绑定
  @Output() change = new EventEmitter<any>(); // emit到父组件的监听事件

  constructor() {
    this.value = false;
   }

  inClick() {
    // 内部逻辑代码
    this.value = !this.value;
    // 类到模板
    this.valueChange.emit(this.value);
    // 模板到类，已是最新的值
    this.change.emit(this.value);
  }
}
