import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {
  public app = this.globalPropertiesService.appGlobal;

  constructor(
    public globalPropertiesService: GlobalPropertiesService
  ) { }

  ngOnInit() {
  }

  ClickedOutsideOfLeftSideBar() {
      // close the menu
      if (this.app.isSmallDevice) {
        this.app.layout.isLeftSidebarMobileClosed = true;
      }
  }

}
