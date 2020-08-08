import { AuthService } from 'app/shared/modules/data-service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Blacklist } from 'app/shared/modules/data-service/blacklist';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';
import { BlacklistApi } from 'app/shared/modules/data-service/BlacklistApi.service';

@Component({
  selector: 'app-blacklist-page',
  templateUrl: './blacklist-page.component.html',
  styleUrls: ['./blacklist-page.component.css']
})
export class BlacklistPageComponent implements OnInit {
  public items: Array<Blacklist> = [];
  selectedItem: Blacklist;
  loading = false;

  ///////////////////////////////////
  // options form editor
  showEditor = false;
  formTitle = 'Event';
  formModel = Blacklist;
  showFormReset = false;
  showFormDelete = false;
  showFormClear = false;
  showFormCancel = false;
  showFormSpinner = false;
  // end options for form editor
  /////////////////////////////////


  cols: any[];
  constructor(
    private logger: LoggerService, private blacklistApi: BlacklistApi,
    public authService: AuthService
    ) { }

  ngOnInit() {
    const d = new Date;

    this.cols = [
      { field: 'plate', header: 'Plate' },
      { field: 'notes', header: 'Notes' },
      { field: 'userstr', header: 'By User' },
      { field: 'createdAt', header: 'Created' },
    ];

    this.getItems();
  }



  async getItems() {
    this.loading = true;
    try {
      this.items = await this.blacklistApi.getItems().toPromise();

      this.items = this.items.map(item => {
        (<any>item).userstr = item.user ? item.user.firstname + ' ' + item.user.lastname : 'admin';
        return item;
      });
    } catch (error) {
      this.logger.error(error);
    } finally {
      this.loading = false;
    }
  }

  async add() {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = false;
    this.formTitle = 'Add Plate';
    this.selectedItem = new Blacklist();
    this.showEditor = true;
  }

  async edit(data) {
    this.showFormClear = false;
    this.showFormCancel = true;
    this.showFormReset = true;
    this.showFormDelete = true;
    this.formTitle = `Edit Plate ${data.plate}`;
    this.selectedItem = data;
    this.showEditor = true;
  }

  async save(data) {


  }

  async delete(data) {
    try {
      this.loading = true;
      await this.blacklistApi.deleteItem(data.id).toPromise();
      this.getItems();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }




  //////////////////////////////////
  // form operations
  onResetClicked(data) {

  }

  onClearClicked(data) {

  }

  async onSaveClicked(data) {
    this.showFormSpinner = true;
    try {
      if (!data.id) {
        await this.blacklistApi.createItem(data).toPromise();
      } else {
        await this.blacklistApi.saveItem(data).toPromise();
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

  onCancelClicked(data) {
    this.showEditor = false;
  }

  async onDeleteClicked(data) {
    this.showFormSpinner = true;
    try {
      await this.blacklistApi.deleteItem(data.id).toPromise();

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

