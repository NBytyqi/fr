import { AuthService } from 'app/shared/modules/data-service/auth.service';

import { Directive, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';

@Directive({
  selector: '[appProtected]'
})
export class AppProtectedDirective implements OnDestroy {
  // private sub: any = null;

  constructor(private userApi: UserApi, private router: Router, private location: Location, private authService: AuthService) {
    if (!this.authService.isAuthenticated()) {
      this.location.replaceState('/'); // clears browser history so they can't navigate with back button
      this.router.navigate(['/login']);
    }

    // this.sub = this.userApi.subscribe((val) => {
    //   if (!val.authenticated) {
    //     this.location.replaceState('/'); // clears browser history so they can't navigate with back button
    //     this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
    //   }
    // });
  }

  ngOnDestroy() {
    // if (this.sub != null) {
    //   this.sub.unsubscribe();
    // }
  }
}
