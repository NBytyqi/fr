import { DataService } from '../../../../shared/modules/data-service/services/data.service';

import { GlobalPropertiesService } from '../../../../shared/modules/global-properties/services/global-properties.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as _ from 'lodash';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-user-options',
  templateUrl: './user-options.component.html',
  styleUrls: ['./user-options.component.css']
})
export class UserOptionsComponent implements OnInit {
  public app = this.globalProps.appGlobal;

  constructor(
    private logger: LoggerService,
    public globalProps: GlobalPropertiesService,
    public dataService: DataService
  ) { }

  async ngOnInit() {

  }

  onUserDropdown() {
    this.logger.info('User options dropdown opened');
  }
}
