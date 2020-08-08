import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, fromEvent } from 'rxjs';

import { Injectable, NgZone } from '@angular/core';

/**
 * @description
 * @class
 */
@Injectable()
export class GlobalPropertiesService {
  public windowResize$: BehaviorSubject<{ windowHeight: number, windowWidth: number }> = new BehaviorSubject(null);


  public appGlobal = {
    name: 'GateControl', // name of your project
    author: 'Sureview Gate Control', // author's name or company name
    description: 'Entry and exit gate control by Sureview', // brief description
    activationPhone: '000-000-0000', // activation number shown on system when deactivated
    version: environment.VERSION, // current version
    year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
    isMobile: this.isMobile(),
    impersonationUser: null,
    isImpersonatingUser: false,
    windowHeight: 0,
    windowWidth: 0,
    isLargeDevice: false,
    isSmallDevice: false,
    isMobileDevice: false,
    currentPageTitle: '',
    currentPageSubTitle: '',
    isDesignerMode: false,
    oneTimeSystemKey: '',
    currentSystemZip: '',
    assetBaseURL: '', // some systems like early android webviews, need the full path for assets to load. Set here
    localCachePath: '',
    defaultLayout: {
      isNavbarFixed: true, // true if you want to initialize the template with fixed header
      isLeftSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
      isLeftSidebarClosed: false, // true if you want to initialize the template with closed sidebar
      isLeftSidebarMobileClosed: true, // slide out in mobile mode
      isRightSidebarClosed: true, // true if you want to initialize the template with closed sidebar
      isFooterFixed: true, // true if you want to initialize the template with fixed footer
      isBoxedPage: false, // true if you want to initialize the template with boxed layout
      layoutName: 'lyt-2',
      theme: 'lyt2-theme-1', // indicate the theme chosen for your project
      logo: 'assets/images/rclogo_small.png', // relative path of the project logo
      logoCollapsed: 'assets/images/favicon.png' // relative path of the collapsed logo
    },
    layout: {
      isNavbarFixed: true, // true if you want to initialize the template with fixed header
      isLeftSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
      isLeftSidebarClosed: false, // true if you want to initialize the template with closed sidebar
      isLeftSidebarMobileClosed: true, // slide out in mobile mode
      isRightSidebarClosed: true, // true if you want to initialize the template with closed sidebar
      isFooterFixed: true, // true if you want to initialize the template with fixed footer
      isBoxedPage: false, // true if you want to initialize the template with boxed layout
      layoutName: 'lyt-2',
      theme: 'lyt2-theme-1', // indicate the theme chosen for your project
      logo: 'assets/images/logo.png', // relative path of the project logo
      logoCollapsed: 'assets/images/logo-white-small.png' // relative path of the collapsed logo
    }
  };


  constructor(
    public ngZone: NgZone,

  ) {
    this.appGlobal.layout = JSON.parse(JSON.stringify(this.appGlobal.defaultLayout));
    this.UpdateSizeProps(); // get initial size
    this.StartWatchingResize();
  }

  isMobile() {
    // true if the browser is a mobile device
    let check = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      check = true;
    }
    return check;
  }

  isIOS() {
    return false; // do check here
  }

  StartWatchingResize() {
    // debounce resize, wait for resize to finish before doing stuff
    const resizeObservable = fromEvent(window, 'resize');
    const resizeRateLimited = resizeObservable;

    // resizeObservable.(() => Observable.interval(15));

    resizeRateLimited.subscribe((event) => {
      // wait 50ms before sending event to let things settle
      this.UpdateSizeProps();
    });
  }


  UpdateSizeProps() {
    this.appGlobal.windowHeight = this.viewport().height;
    this.appGlobal.windowWidth = this.viewport().width;

    if (this.appGlobal.windowWidth >= 992) {
      this.appGlobal.isLargeDevice = true;
    } else {
      this.appGlobal.isLargeDevice = false;
    }
    if (this.appGlobal.windowWidth < 992) {
      this.appGlobal.isSmallDevice = true;
    } else {
      this.appGlobal.isSmallDevice = false;
    }
    if (this.appGlobal.windowWidth < 768) {
      this.appGlobal.isMobileDevice = true;
    } else {
      this.appGlobal.isMobileDevice = false;
    }

    // publish changes to subscribers
    this.windowResize$.next({ windowHeight: this.appGlobal.windowHeight, windowWidth: this.appGlobal.windowWidth });

  }

  // Function that finds the exact height and width of the main viewport in a cross-browser way
  viewport() {
    let e: any = window;
    let a = 'inner';
    if (!('innerWidth' in window)) {
      a = 'client';
      e = document.documentElement || document.body;
    }
    return {
      width: e[a + 'Width'],
      height: e[a + 'Height']
    };
  }
}
