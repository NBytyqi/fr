import { Component, OnInit } from '@angular/core';
import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public app = this.globalProps.appGlobal;

  constructor(
    public globalProps: GlobalPropertiesService,

  ) { }

  ngOnInit() {
  }


  toTheTop() {
    // scroll to the top of the page here

  }
}
