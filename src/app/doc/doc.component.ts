import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  checked: boolean;
  checked1: boolean;
  sliderValue: number;
  testValue: string;
  sliderValueTwo: number;
  checkboxList: string[];
  radioo: string;

  switchForm = new FormGroup({
    switchValue: new FormControl()
  });

  myFormGroup = new FormGroup({
    checkList: new FormControl('', {
      validators: Validators.required
    })
  });

  constructor() { }

  ngOnInit() {
    this.checked = Math.random() > .5 ? true : false;
    this.sliderValue = 20;
    this.sliderValueTwo = 10;
    this.checked1 = Math.random() > .5 ? true : false;
    this.checkboxList = [];
  }

  btnChange(value: boolean) {
    console.log('btnChange-click: ' + value);
  }

  myInput() {
    console.log(this.testValue);
  }

  handleSwitchChange(obj) {
    console.log(obj);
  }

  public updateSwitchValue(check: boolean) {
    // 不一定像文档说的，只能整体替换控件的值
    this.switchForm.controls.switchValue.setValue(!check);
    // 对任何属性设置值
    // this.switchForm.patchValue({
    //   switchValue: !check
    // });
  }

  setNormalValue() {
    this.checkboxList = ['New York', 'Los Angeles'];
  }

  onSubmit() {
    console.log(this.switchForm);
  }

  handleRadioClick(event) {
    console.log(event);
  }

}
