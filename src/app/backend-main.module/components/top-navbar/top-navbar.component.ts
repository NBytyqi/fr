import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { Router } from '@angular/router';
import { DataService } from '../../../shared/modules/data-service/services/data.service';
import { trigger, transition, state, animate, style } from '@angular/animations';


import { FullscreenService } from './../../../core.module/modules/fullscreen.module/fullscreen.service';
import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit, HostListener, EventEmitter, Output, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css'],
  animations: [
    trigger('menuDrawer', [
      state('opened', style({ display: 'block', transform: 'translateY(0)', opacity: 1 })),
      state('closed', style({ display: 'block', transform: 'translateY(-100%)', opacity: 1 })),
      transition('* => opened', animate('300ms ease-out')),
      transition('opened => *', animate('300ms ease-out'))
    ])
  ]
})
export class TopNavbarComponent implements OnInit {
  public mobileFolderCollapsed = true;
  public app = this.globalProps.appGlobal;

  @Output() RightSidebarClick = new EventEmitter();
  @Output() LeftSidebarClick = new EventEmitter();

  public messages = [];

  constructor(
    public globalProps: GlobalPropertiesService,
    public fullscreen: FullscreenService,
    public logger: LoggerService,
    public changeDetectorRef: ChangeDetectorRef,
    public dataService: DataService,
    public router: Router
  ) { }

  ngOnInit() {
    // update menustate on resize
    this.globalProps.windowResize$.subscribe((size) => {
      this.changeDetectorRef.detectChanges();
    });


  }

  getMenuState() {
    if (!this.mobileFolderCollapsed) {
      return 'opened';
    } else {
      return this.app.isMobileDevice ? 'closed' : 'opened';
    }
  }

  menuToggle() {
  }

  toggleLeftSidebar() {
    // set global state
    if (this.app.isSmallDevice) {
      this.app.layout.isLeftSidebarMobileClosed = !this.app.layout.isLeftSidebarMobileClosed;
    } else {
      this.app.layout.isLeftSidebarClosed = !this.app.layout.isLeftSidebarClosed;
    }

    this.globalProps.UpdateSizeProps(); // indicate to designer that we have changed a core layout parm
    this.LeftSidebarClick.emit();
  }

  toggleRightSidebar() {
    // set global state
    this.app.layout.isRightSidebarClosed = !this.app.layout.isRightSidebarClosed;
    this.RightSidebarClick.emit();
  }

  messageDropdownToggled() {
    this.logger.info('messages dropdown toggled');
  }

  activitiesDropdownToggled() {
    this.logger.info('activities dropdown toggled');
  }

  toggleFullscreen() {
    this.fullscreen.toggleFullscreen();
  }

  logoClicked() {
    // alert("logo clicked");
  }



}
