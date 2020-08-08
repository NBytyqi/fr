import { Component, OnInit, Input } from '@angular/core';
// declare var fabric: any; // none typed
// import * as fabric from 'fabric'; // typed
// import * as jQuery from 'jquery';
// import * as fabric from 'fabric';

// const fabricF = require('../../node_modules/fabric-customise-controls/dist/customiseControls');
// declare var fabric: any;

// const fcc = require( '../../../assets/js/customiseControls.js');
// declare var require('../../node_modules/fabric-customise-controls/dist/customiseControls');

@Component({
  selector: 'app-tester',
  templateUrl: './tester.component.html',
  styleUrls: ['./tester.component.css']
})
export class TesterComponent implements OnInit {

  @Input()
  title: string;

  constructor() {

    // if (jQuery) {
    //   console.log('jquery is loaded');
    // } else {
    //   console.log('Not loaded');
    // }

    // console.log(fabric);
    // console.log(fcc);

    // console.log(fcc(fabric).version);

  }

  ngOnInit() {
    console.log('Tester Component ngOnInit!');



  }

}
