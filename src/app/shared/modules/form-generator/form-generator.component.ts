import { Permissions } from './../data-service/permissions';
import { CameraApi } from './../data-service/CameraApi.service';
import { Component, OnInit, Input, OnDestroy, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { DynamicFormGroup, DynamicFormBuilder } from 'ngx-dynamic-form-builder';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGeneratorComponent implements OnInit, OnDestroy {

  formOps = [];
  formOps2 = [];
  cams = [];
  gotCams = false;
  @Input() disabledFields = [];

  dropdownVal;

  private _show = false;
  @Output() showChange = new EventEmitter<boolean>();
  @Input()
  get show() {
    return this._show;
  }
  set show(val) {
    this._show = val;

    if (val) {
      this.gotCams = false;
      this.showSpinner = false;


      this.formOps = this._formModel.formOps;
      const formVals = {};

      for (const op of this.formOps) {
        formVals[op.field] = op.default;
        if (op.type === 'dropdown_cams' && !this.gotCams) {
          this.getCams();
        }
      }

      this.fb = new DynamicFormBuilder();

      if (this._formModel.name === 'User') {
        const formVals2 = {};
        this.formOps2 = Permissions.formOps;
        for (const op of this.formOps2) {
          formVals2[op.field] = op.default;
        }
        this.form2 = this.fb.group(Permissions, formVals2);


      }



      this.form = this.fb.group(this._formModel, formVals);

      if (this.item) {
        this.form.object = this.item;
      }

      setTimeout(() => {
        for (const key of Object.keys(this.form.controls)) {
          this.disabledFields.indexOf(key) > -1 ? this.form.get(key).disable() : this.form.get(key).enable();
        }
      }, 0);


    }
    this.showChange.emit(this._show);
  }

  formModelPermissons;
  form2;

  private _formModel;
  @Input()
  get formModel() {
    return this._formModel;
  }
  set formModel(val) {
    this._formModel = val;
    if (val) {
      this.formOps = this._formModel.formOps;
      const formVals = {};
      for (const op of this.formOps) {
        formVals[op.field] = op.default;
        if (op.type === 'dropdown_cams' && !this.gotCams) {
          this.getCams();
        }
      }



      this.fb = new DynamicFormBuilder();

      if (this._formModel.name === 'User') {
        const formVals2 = {};
        this.formOps2 = Permissions.formOps;
        for (const op of this.formOps2) {
          formVals2[op.field] = op.default;
        }
        this.form2 = this.fb.group(Permissions, formVals2);
      }


      this.form = this.fb.group(val, formVals);


      // this.form.resetValidateAllFormFields();
      this.form.validateAllFormFields();

      if (!this.errorChangeSubscription) {
        this.errorChangeSubscription = this.form.customValidateErrors.subscribe((allErrors) => {
          // console.log(`Errors changed: ${allErrors}`);
        });
      }

    }
  }

  @Input() title = '';
  @Input() savedItem;

  private _item;
  @Input()
  get item() {
    return this._item;
  }
  set item(val) {
    this.form.object = val;

    this._item = val;

    if (this.form2 && val && val.permission) {
      this.form2.object = val.permission;
    }

    setTimeout(() => {
      // this.form.resetValidateAllFormFields();
      this.form.validateAllFormFields();
    }, 0);

  }
  @Input() showReset = true;
  @Input() showDelete = true;
  @Input() showClear = true;
  @Input() showCancel = true;

  @Input() showSpinner = false;

  fb;
  form;
  errorChangeSubscription: Subscription;


  @Output() onDelete = new EventEmitter<any>();
  @Output() onReset = new EventEmitter<any>();
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();

  constructor(private cameraApi: CameraApi) {



  }

  async getCams() {
    try {
      this.gotCams = true;

      const tempCams = await this.cameraApi.getItems().toPromise();
      this.cams = tempCams.map(item => {
        return { label: item.name, value: item.id };
      });

    } catch (error) {

    }
  }

  getClassType(type) {
    switch (type) {
      case 'Gate':

        break;

      default:
        break;
    }

  }

  ngOnInit() {


  }

  ngOnDestroy() {
    if (this.errorChangeSubscription != null && this.errorChangeSubscription.closed === false) {
      this.errorChangeSubscription.unsubscribe();
    }

  }

  onResetClick(): void {
    this.savedItem = undefined;
    this.form.object = this.item;


    this.form.validateAllFormFields();
    // this.form.resetValidateAllFormFields();
    this.onReset.emit(this.form.object);

  }
  onClearClick(): void {
    this.savedItem = undefined;
    this.form.object = new this._formModel;
    this.form.validateAllFormFields();
    this.onClear.emit(this.item);
  }
  onSaveClick(): void {
    this.form.validateAllFormFields();
    if (this.form.valid) {
      this.savedItem = this.form.object;

      if (this.form2 && this.form2.valid) {
        this.savedItem.permissions = this.form2.object; // add permissions
      }

      if (this.form2 && !this.form2.valid) {
        return;
      }

      this.onSave.emit(this.savedItem);
    }
  }

  onCancelClick() {
    this.show = false;
    this.onCancel.emit(this.item);
  }

  onDeleteClick() {
    this.onDelete.emit(this.item);

  }

}
