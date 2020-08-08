import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-toolbar',
  templateUrl: './breadcrumb-toolbar.component.html',
  styleUrls: ['./breadcrumb-toolbar.component.css']
})
export class BreadcrumbToolbarComponent implements OnInit {

  public app = this.globalProps.appGlobal;

  constructor(
    public globalProps: GlobalPropertiesService
  ) { }

  ngOnInit() {
  }

}
