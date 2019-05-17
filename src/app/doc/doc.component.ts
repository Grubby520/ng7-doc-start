import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  checked: boolean;
  sliderValue: number;
  testValue: string;
  sliderValueTwo: number;

  constructor() { }

  ngOnInit() {
    this.checked = Math.random() > .5 ? true : false;
    this.sliderValue = 20;
    this.sliderValueTwo = 10;
  }

  btnChange(value: boolean) {
    console.log('btnChange-click: ' + value);
  }

  myInput() {
    console.log(this.testValue);
  }

}
