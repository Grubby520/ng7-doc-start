import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.css']
})
export class DocComponent implements OnInit {
  checked: boolean;

  constructor() { }

  ngOnInit() {
    this.checked = Math.random() > .5 ? true : false;
  }

  btnChange(value: boolean) {
    console.log('btnChange-click: ' + value);
  }

}
