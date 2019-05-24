import { Component, OnInit, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioComponent),
    multi: true
  }]
})
export class RadioComponent implements ControlValueAccessor {
  @Input() style: any;
  @Input() styleClass: string;
  @Input() labelStyleClass: string;
  @Input() tabindex: number;
  @Input() inputId: string;
  @Input() name: string;

  @Input() value: any;
  @Input() label: string;

  @Input() disabled: boolean;
  @Input() checked: boolean; // 是否选中
  focused: boolean;

  @Output() clicks: EventEmitter<any>; // onChange事件
  onModelChange: Function;
  onModelTouched: Function;

  @ViewChild('rb') rb: ElementRef;

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.disabled = false;
    this.checked = false;
    this.onModelChange = () => {};
    this.onModelTouched = () => {};
    this.clicks = new EventEmitter<any>();
  }

  get isEnable() {
    return !this.disabled;
  }

  /**
   * template模板 源事件
   */
  handleClick(event: Event, rb: HTMLInputElement): void {
    if (this.isEnable) {
      this.select();
      rb.focus();
    }
    event.preventDefault();
  }

  /**
   * label点击事件
   * ViewChild属性装饰器，获取DOM元素（模板与类的通信桥梁）
   */
  select() {
    if (this.isEnable) {
      this.rb.nativeElement.checked = true;
      this.checked = true;
      this.onModelChange(this.value); // 回传value值，实现双向数据绑定
      this.clicks.emit(this.value); // 暴露给父组件的函数
    }
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onModelTouched();
  }

  onChange() {
    this.select();
  }

  writeValue(value: string): void {
    // ngModel值改变时更新checked状态
    this.checked = (value === this.value);
    this.cd.markForCheck();
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }

}
