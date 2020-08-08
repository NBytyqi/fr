import { GlobalPropertiesService } from '../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.css'],
encapsulation: ViewEncapsulation.None
})
export class HorizontalMenuComponent implements OnInit {

  public app = this.globalProps.appGlobal;
  public horizontalNavbarCollapsed: boolean;
  public utilitiesActive: boolean;
  public appTableMenuActive: boolean;
  public appFormMenuActive: boolean;
  public appLoginMenuActive: boolean;
  public appPagesMenuActive: boolean;
  public appChartsMenuActive: boolean;
  public appMapsMenuActive: boolean;
  public appUiIconActive: boolean;
  public appLineIconActive: boolean;

  public appUIMenuActive: boolean;

  constructor(
    public globalProps: GlobalPropertiesService,
    public logger: LoggerService

  ) { }

  ngOnInit() {
  }


  menuInit(startval) {
    this.logger.info('todo: menuInit.. what is this for?');
  }
}
