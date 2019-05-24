import { Component, EventEmitter, ChangeDetectorRef, forwardRef, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
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
export class InputSwitchNgModelComponent implements ControlValueAccessor, OnChanges {
  @Input() style: any;
  @Input() tabindex: number;
  @Input() inputId: string;
  @Input() name: string;
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() checked: boolean; // 是否选中
  @Output() change: EventEmitter<any>; // onChange事件
  onModelChange: Function;
  onModelTouched: Function;

  focused: boolean;

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.disabled = false;
    this.readonly = false;
    this.checked = false;
    this.onModelChange = () => {};
    this.onModelTouched = () => {};
    this.change = new EventEmitter<any>();
  }

  /**
   * template模板 源事件
   */
  handleClick(event: Event, rb: HTMLInputElement, focus: boolean): void {
    if (!this.disabled) {
      this.toggle(event);
      rb.focus();
    }
  }

  select() {

  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onModelTouched();
  }

  onChange() {

  }

  writeValue(checked: boolean): void {
    console.log('writeValue');
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
