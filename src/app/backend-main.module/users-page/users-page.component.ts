import { User } from './../../shared/modules/data-service/User';
import { UserApi } from 'app/shared/modules/data-service/UserApi.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  public items: Array<User> = [];
  selectedItem: User;
  loading = false;

  cols: any[];

  @ViewChild('plateImageOverlay', { static: true }) plateImageOverlay;

  ///////////////////////////////////
  // options form editor
  showEditor = false;
  formTitle = 'User';
  formModel = User;
  showFormReset = false;
  showFormDelete = false;
  showFormClear = false;
  showFormCancel = false;
  showFormSpinner = false;
  disabledFields = [];
  // end options for form editor
  /////////////////////////////////

  constructor(private logger: LoggerService, private userApi: UserApi, public authService: AuthService) { }

  ngOnInit() {
    const d = new Date;

    this.cols = [
      { field: 'active', header: 'Enabled' },
      { field: 'access', header: 'Type' },
      { field: 'firstname', header: 'First' },
      { field: 'lastname', header: 'Last' },
      { field: 'email', header: 'Username' },
      { field: 'description', header: 'Description' }
    ];

    this.getItems();
  }



  async getItems() {
    this.loading = true;
    try {
      this.items = await this.userApi.getItems().toPromise();

      // this.items = <any>this.items.map(item => {
      //   if (item.gate) {
      //     // add virtual props for searching
      //     (<any>item).gateName = item.gate.name;
      //     (<any>item).dateTimeStr = new Date(item.startDate).toLocaleString();
      //     (<any>item).durationStr = this.msToHMS(item.duration);
      //   }
      //   return item;
      // });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.loading = false;
    }
  }

  add() {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = false;
    this.formTitle = 'Add new User';
    this.selectedItem = new User();
    this.showEditor = true;
    this.disabledFields = [];
  }

  async edit(data) {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = data.email !== 'admin' ? true : false;
    this.formTitle = `Edit User ${data.email}`;
    this.selectedItem = data;
    this.showEditor = true;
    if (data.email === 'admin') {
      this.disabledFields = ['email', 'active', 'access', 'canSearch', 'canDelete', 'canOverrideBlacklist', 'canEditSettings', 'canAddToBlacklist', 'canRemoveFromBalcklist'];
    } else {
      this.disabledFields = [];
    }

  }

  async save(data) {


  }

  async delete(data) {
    try {
      this.loading = true;
      await this.userApi.deleteItem(data.id).toPromise();
      this.getItems();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }


  onCancelClicked(data) {
    this.showEditor = false;
  }

  async onSaveClicked(data) {
    this.showFormSpinner = true;
    try {
      if (!data.id) {
        await this.userApi.createItem(data).toPromise();
      } else {
        await this.userApi.saveItem(data).toPromise();
      }

      // update item in list
      this.getItems();
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.showFormSpinner = false;
      this.showEditor = false;
    }
  }

  async onDeleteClicked(data) {
    this.showFormSpinner = true;
    try {
      await this.userApi.deleteItem(data.id).toPromise();

      // update item in list
      this.getItems();
    } catch (error) {

    } finally {
      this.showFormSpinner = false;
      this.showEditor = false;
    }
  }
  //////////////////////////////////


}
