import { DataService } from '../shared/modules/data-service/services/data.service';
import { GlobalPropertiesService } from '../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit, HostListener, HostBinding, ViewEncapsulation } from '@angular/core';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-backend-main',
  templateUrl: './backend-main.component.html',
  styleUrls: ['./backend-main.component.css']
})
export class BackendMainComponent implements OnInit {
  public app = this.globalProps.appGlobal;
  public loading: boolean;

  // @HostBinding('id') id = 'app';
  // @HostBinding('class.app-sidebar-fixed') sidebarFixed = this.globalProps.appGlobal.layout.isSidebarFixed;
  // @HostBinding('class.app-sidebar-closed') isLeftSidebarClosed = this.globalProps.appGlobal.layout.isLeftSidebarClosed;
  // @HostBinding('class.app-footer-fixed') footerFixed = this.globalProps.appGlobal.layout.isFooterFixed;

  constructor(
    public globalProps: GlobalPropertiesService,
    public logger: LoggerService,
    private dataService: DataService
  ) {

    // start realtime
    if (!this.dataService.realtimeStarted) {
      this.dataService.connectRealtime();
    }

  }

  ngOnInit() {
    this.dataService.setCurrentUser();


  }

  // Apply on resize
  @HostListener('resize', ['$event'])
  onWindowResize(event) {

    // if (this.app.isLargeDevice) {
    //   $('#app .main-content').css({
    //     position: 'relative',
    //     top: 'auto',
    //     width: 'auto'
    //   });
    //   $('footer').show();
    // }
  }

  toggleRightSidebar() {
    // this.app.layout.isRightSidebarClosed = !this.app.layout.isRightSidebarClosed;
    this.logger.info('right sidebar button clicked!');
  }

  toggleLeftSidebar() {
    // this.app.layout.isLeftSidebarClosed = !this.app.layout.isLeftSidebarClosed;
    // this.isLeftSidebarClosed = !this.isLeftSidebarClosed;
    this.logger.info('left sidebar button clicked!');
  }



}
