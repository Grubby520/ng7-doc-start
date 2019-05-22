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
   * 输入属性变化的监听函数
   */
  ngOnChanges(obj: SimpleChanges) {
    console.log(obj);
  }

  /**
   * template模板 源事件
   * @param event 组件
   * @param cb 表单元素
   */
  onClick(event: Event, cb: HTMLInputElement): void {
    if (!this.disabled && !this.readonly) {
      this.toggle(event);
      cb.focus(); // ?
    }
  }

  /**
   * 触发切换事件
   */
  toggle(event): void {
    this.updateModel(event, !this.checked);
  }

  /**
   * 更新model
   */
  updateModel(event, value): void {
    this.checked = value;
    this.onModelChange(this.checked); // model到UI
    this.change.emit({ // 暴露给外部的钩子函数
      originEvent: event,
      checked: this.checked
    });
  }

  onInputChange(event: Event) {
    if (!this.readonly) {
      this.updateModel(event, event.target['checked']);
    }
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
    this.onModelTouched();
  }

  writeValue(checked: boolean): void {
    console.log('writeValue');
    this.checked = checked;
    this.cd.markForCheck(); // always脏检查
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  /**
   * 检查 touched
   */
  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean): void {
    this.disabled = val;
  }
}
