import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { Subscription } from 'rxjs';
import { GlobalPropertiesService } from '../../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OnDestroy } from '@angular/core/core';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { DataService } from '../../../../shared/modules/data-service/services/data.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit, OnDestroy {
  public formPagesOpen: boolean;
  public loginPagesOpen: boolean;
  public utilityPagesOpen: boolean;
  public app = this.globalProps.appGlobal;
  public routeSub: Subscription;
  public showAbout: boolean;
  public scheduleOpen: boolean;
  public authService;

  constructor(
    public globalProps: GlobalPropertiesService,
    public router: Router,
    public dataService: DataService
  ) { }

  async ngOnInit() {
    this.authService = this.dataService.userApi.authService;
    this.routeSub = this.router.events.subscribe((nav) => {
      // close the menu
      if (this.app.isSmallDevice) {
        this.app.layout.isLeftSidebarMobileClosed = true;
      }
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
