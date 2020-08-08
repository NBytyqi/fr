import { Validate, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Permissions {

  static formOps = [
    // {field: 'id', title: 'Id', type: 'text_input', placeholder: 'Enter ID', newOnly: true},
    {field: 'canSearch', title: 'See History', type: 'checkbox', placeholder: '', default: true},
    {field: 'canDelete', title: 'Delete History', type: 'checkbox', placeholder: '', default: true},
    {field: 'canOverrideBlacklist', title: 'Can Override', type: 'checkbox', placeholder: '', default: true},
    {field: 'canEditSettings', title: 'Change Settings', type: 'checkbox', placeholder: '', default: true},
    {field: 'canAddToBlacklist', title: 'Add to Blacklist', type: 'checkbox', placeholder: '', default: true},
    {field: 'canRemoveFromBlacklist', title: 'Remove From Blacklist', type: 'checkbox', placeholder: '', default: true},
    // {field: 'canDelete', title: 'User Type', type: 'dropdown', placeholder: '', default: 'user', data: {options: [{label: 'User', value: 'user'}, {label: 'Admin', value: 'admin' }]}},


  ];

  public id: string;
  public cameras: Array<string>; // camera ids
  public canSearch = true;
  public canDelete = true;
  public canOverrideBlacklist = true;
  public canEditSettings = true;
  public canAddToBlacklist = true;
  public canRemoveFromBlacklist = true;

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  toString() {
    const arr: string[] = [];
    if (arr.length === 0 && this.id) {
      arr.push(this.id);
    }
    return arr.join(' ');
  }
}
