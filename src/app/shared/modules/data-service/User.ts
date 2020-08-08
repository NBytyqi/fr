import { Permissions } from './permissions';
import { Validate, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class User {


  static formOps = [
    // {field: 'id', title: 'Id', type: 'text_input', placeholder: 'Enter ID', newOnly: true},
    {field: 'active', title: 'Enabled', type: 'checkbox', placeholder: '', default: true},
    {field: 'access', title: 'User Type', type: 'dropdown', placeholder: '', default: 'user', data: {options: [{label: 'User', value: 'user'}, {label: 'Admin', value: 'admin' }]}},
    {field: 'email', title: 'Username', type: 'text_input', placeholder: ''},
    {field: 'firstname', title: 'First Name', type: 'text_input', placeholder: ''},
    {field: 'lastname', title: 'Last Name', type: 'text_input', placeholder: ''},
    {field: 'password', title: 'Password', type: 'password_input', placeholder: ''},
    {field: 'password2', title: 'Password Again', type: 'password_input', placeholder: ''},
    {field: 'description', title: 'Description', type: 'text_input', placeholder: ''},

  ];


  public id: string;
  public active = true;
  @IsNotEmpty()
  public firstname = '';
  @IsNotEmpty()
  public lastname = '';
  @IsNotEmpty()
  public email = '';
  @IsNotEmpty()
  public password: string;
  public password2: string; // virtual prop to test password entry
  public lastLogin: Date;
  public description: string;
  public scope: string;
  public access = 'user';


  public permissionId;
  public permission: Permissions;


  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  toString() {
    const arr: string[] = [];
    if (arr.length === 0 && this.firstname) {
      arr.push(this.firstname);
    }
    return arr.join(' ');
  }
}


