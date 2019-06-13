import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-array-validator',
  templateUrl: './form-array-validator.component.html',
  styleUrls: ['./form-array-validator.component.scss']
})
export class FormArrayValidatorComponent implements OnInit {
  // appForm: FormArray;
  // appForm: FormGroup;
  appForm: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.APIInitData((res) => {
      const _arr = [];
      res.forEach(item => {
        _arr.push(this.fb.group({
          id: [item.value],
          name: [item.label, Validators.required],
          age: ['']
          }));
        });
      this.appForm = this.fb.array(_arr);
      // this.appForm = this.fb.group({
      //   id: [''],
      //   name: ['', Validators.required],
      //   age: ['', Validators.required]
      // });
      console.log(this.appForm);
    });
  }

  onSubmit() {

  }

  resetForm() {

  }

  APIInitData(callbackFn: Function) {
    callbackFn([
      {
        label: '华为',
        value: 'huawei'
      }, {
        label: '中兴',
        value: 'zhongxin'
      }
    ]);
  }

}
