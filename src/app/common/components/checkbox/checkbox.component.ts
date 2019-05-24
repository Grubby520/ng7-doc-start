import { Component, OnInit, EventEmitter, ChangeDetectorRef, forwardRef, OnChanges, SimpleChanges, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  @Input() name: string;
  @Input() value: any;
  @Input() label: string;
  @Input() disabled: boolean;
  @Input() binary: boolean;
  @Input() tabindex: number;
  @Input() inputId: string;
  @Input() style: any;
  @Input() styleClass: string;
  @Input() labelStyleClass: string;
  @Output() change: EventEmitter<any>;
  formControl: FormControl;
  checked: boolean;
  focused: boolean;
  model: any;
  onModelChange: Function;
  onModelTouched: Function;

  constructor(
    private cd: ChangeDetectorRef
  ) {
    this.change = new EventEmitter<any>();
    this.onModelChange = () => {};
    this.onModelTouched = () => {};
    this.focused = false;
    this.checked = false;
  }

  ngOnInit() {
  }

  /**
   * template模板 源事件
   * @param event 组件
   * @param cb 表单元素
   * @param focus 触发focus事件
   */
  onClick(event: Event, checkbox: HTMLInputElement, focus: boolean): void {
    event.preventDefault();
    if (this.disabled) {
      return ;
    }
    this.checked = !this.checked;
    this.updateModel();
    if (focus) {
      checkbox.focus();
    }
  }

  /**
   * 更新model
   */
  updateModel() {
    if (!this.binary) {
      if (this.checked) {
        this.addValue();
      } else {
        this.removeValue();
      }
      this.onModelChange(this.model); // model-to-ui
      if (this.formControl) {
        this.formControl.setValue(this.model); // 触发writeValue
      }
    } else {
      this.onModelChange(this.checked);
    }
    this.change.emit(this.checked); // 外部获取的event事件
  }

  addValue() {
    if (this.model) {
      this.model = this.model.concat([this.value]);
    } else {
      this.model = [this.value]; // 第一次初始化
    }
  }

  removeValue() {
    this.model = this.model.filter((item) => {
      return item !== this.value;
    });
  }

  handleChange(event: any) {
    this.checked = event.target.checked;
    this.updateModel();
  }

  isChecked() {
    if (this.binary) { // 允许返回boolean值
      return this.model;
    } else {
      return this.model && this.model.indexOf(this.value) > -1;
    }
  }

  // 触发更新-内部状态
  onFocus(event) {
    this.focused = true;
  }

  onBlur(event) {
    this.focused = false;
    this.onModelTouched();
  }

  // Angular API 和 DOM 元素之间的桥梁
  writeValue(model) {
    this.model = model;
    this.checked = this.isChecked();
    this.cd.markForCheck();
  }

  registerOnChange(fn: any) {
    // console.log('registerOnChange');
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any) {
    // console.log('registerOnTouched');
    this.onModelTouched = fn;
  }

  setDisabledState(val: boolean) {
    this.disabled = val;
  }

}
