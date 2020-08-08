import { User } from './User';
import { Validate, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Blacklist {

  static formOps = [
    // {field: 'id', title: 'Id', type: 'text_input', placeholder: 'Enter ID', newOnly: true},
    { field: 'plate', title: 'Plate number', type: 'text_input', placeholder: 'Plate Number' },
    { field: 'notes', title: 'Notes', type: 'text_input', placeholder: 'Notes' },

  ];

  public id: string;
  @IsNotEmpty()
  public plate: string;
  public notes: string;

  public userId: string;
  public user: User;

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  toString() {
    const arr: string[] = [];
    if (arr.length === 0 && this.plate) {
      arr.push(this.plate);
    }
    return arr.join(' ');
  }
}
