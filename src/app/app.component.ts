import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { GlobalPropertiesService } from './shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit } from '@angular/core';
import { LazyloaderService } from './shared/services/lazyloader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public app = this.globalProps.appGlobal;

  constructor(
    public globalProps: GlobalPropertiesService,
    public authService: AuthService,
    public userApi: UserApi,
    public router: Router
  ) {
  }

  async ngOnInit(
  ) {
    console.log('Gate Control Loaded... Ready to rock. v' + this.globalProps.appGlobal.version);

    // prevent user from refreshing page by pulling down, normally i don't like this, but it can mess things up if done by accident
    document.addEventListener('touchmove', function (event: any) {
      event = event.originalEvent || event;
      if (event.scale && event.scale !== 1) {
        event.preventDefault();
      }
    }, false);

    window.performance.mark('gatecontrol_loaded');

    if (this.authService.getToken()) {
      const currentUser = await this.userApi.getItem().toPromise();

      if (!currentUser) {
        this.router.navigate(['/auth/logout']);
      } else {
        this.authService.setUser(currentUser);
        this.router.navigate(['/main']);
      }

    }

  }

}


