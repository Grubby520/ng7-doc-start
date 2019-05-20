import { Component, EventEmitter, ChangeDetectorRef, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-input-switch-ng-model',
  templateUrl: './input-switch-ng-model.component.html',
  styleUrls: ['./input-switch-ng-model.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputSwitchNgModelComponent),
    multi: true
  }]
})
export class InputSwitchNgModelComponent implements ControlValueAccessor {
  @Input() style: any;
  @Input() styleClass: string;
  @Input() tabindex: number;
  @Input() inputId: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() checked: boolean; // 是否选中
  focused: boolean;
  onModelChange: Function;
  onModelTouched: Function;

  onChange: EventEmitter<any>; // onChange事件
  value: boolean;
  change: Function;

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.checked = false;
    this.focused = false;
    this.onModelChange = () => {};
    this.onModelTouched = () => {};
    this.onChange = new EventEmitter<any>();
  }

  /**
   * template模板 源事件
   * @param event 组件
   * @param cb 表单元素
   */
  onClick(event, cb) {
    console.log(event);
    console.log(cb);
    if (!this.disabled && !this.readonly) {
      this.toggle(event);
      cb.focus();
    }
  }

  onInputChange(event) {
    if (!this.readonly) {
      this.updateModel(event, event.target.checked);
    }
  }

  toggle(event) {
    this.updateModel(event, !this.checked);
  }

  updateModel(event, value) {
    this.checked = value;
    this.onModelChange(this.checked);
    this.onChange.emit({ // 暴露给外部的回调函数
      originEvent: event,
      checked: this.checked
    });
  }

  onFocus(event) {
    this.focused = true;
  }

  onBlur(event) {
    this.focused = false;
    this.onModelTouched();
  }

  writeValue(checked: boolean): void {
    this.checked = checked;
    this.cd.markForCheck(); // always脏检查
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
