import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormControlValidatorModel } from './formControlValidator.model';

import { nameValid } from '../../utils/validators/validator.fn';

@Component({
  selector: 'app-form-control-validator',
  templateUrl: './formControlValidator.component.html',
  styleUrls: ['./formControlValidator.component.css']
})
export class FormControlValidatorComponent implements OnInit {
  appFormModel: FormControlValidatorModel;
  initFormData: Object;
  appForm: FormGroup;

  telephone: '13545678977';

  valids = {
    ageValid(control: FormControl) {
      let msg = '';
      const reg = /^[1-9]\d*$/;
      if (!reg.test(control.value)) {
        msg = '请输入正整数';
      } else if (Number(control.value) < 18) {
        msg = '年龄小于18岁，未成年';
      } else if (Number(control.value) > 60) {
        msg = '年龄大于60岁，太老了';
      }
      return msg.length ? {result: {info: msg}} : null;
    },
    hobbyValid(control: FormControl) {
      const msg = '请勾选一项或多项爱好';
      if (control.value.length) {
        return null;
      }
      return {result: {info: msg}};
    }
  };

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    /**
    * 有三个方法：control()、group() 和 array()
    */
    this.appForm = this.fb.group({
      name: ['abc', [Validators.required, nameValid]],
      age: ['', [Validators.required, this.valids.ageValid]],
      hobbyList: [[], this.valids.hobbyValid],
      sex: ['', Validators.required],
      telephone: ['', []]
    });

    // mock-APICallback
    this.APIAppFormFind((res: any) => {
      this.initFormData = Object.assign({}, res);
      this.appFormModel = new FormControlValidatorModel(res);
    });
    // end
  }

  /**
   * 重置表单
   */
  resetForm() {
    // this.appForm.setValue(this.initFormData);
    this.appForm.reset(this.initFormData);
  }

  /**
   * 提交表单
   */
  onSubmit() {
    console.log(this.appForm.value);
  }

  /**
   * API 回显表单(mock)
   */
  APIAppFormFind(callback: Function) {
    const result = {
      name: 'zhangsan',
      age: '',
      hobbyList: ['football'],
      sex: '',
      telephone: '13578945644'
    };
    callback(result);
  }

}
