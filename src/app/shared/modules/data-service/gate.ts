import { Camera } from './camera';
import { Validate, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { plainToClassFromExist } from 'class-transformer';

export class Gate {

  static formOps = [
    // {field: 'id', title: 'Id', type: 'text_input', placeholder: 'Enter ID', newOnly: true},
    {field: 'name', title: 'Gate Name', type: 'text_input', placeholder: 'name'},
    {field: 'cameraId', title: 'Camera', type: 'dropdown_cams', placeholder: ''},
    {field: 'type', title: 'Gate Direction', type: 'dropdown', placeholder: '', data: {options: [{label: 'Entrance', value: 'Entrance'}, {label: 'Exit', value: 'Exit' }]}},
    {field: 'modbus_ipaddress', title: 'Modbus IP', type: 'text_input', placeholder: ''},
    {field: 'modbus_port', title: 'Modbus Port', type: 'number_input', placeholder: ''},
    {field: 'modbus_slave_id', title: 'Modbus ID', type: 'number_input', placeholder: ''},
    {field: 'modbus_read_coiladdress', title: 'Modbus Sensor Address', type: 'number_input', placeholder: ''},
    {field: 'modbus_write_coiladdress', title: 'Modbus Output Address', type: 'number_input', placeholder: ''},
    {field: 'description', title: 'Description', type: 'text_input', placeholder: ''},

  ];

  public id: string;
  @IsNotEmpty()
  public name: string;
  @IsNotEmpty()
  public type = 'Entrance';
  @IsNotEmpty()
  public modbus_ipaddress: string;
  @IsNotEmpty()
  public modbus_port = 502;

  @Min(1)
  @Max(255)
  @IsNotEmpty()
  public modbus_slave_id = 1;
  @IsNotEmpty()
  public modbus_read_coiladdress = 0;
  @IsNotEmpty()
  public modbus_write_coiladdress = 0;

  @IsOptional()
  public description: string;


  // relations
  @IsNotEmpty()
  public cameraId = '';
  public camera: Camera;

  constructor(data?: any) {
    plainToClassFromExist(this, data);
  }

  toString() {
    const arr: string[] = [];
    if (arr.length === 0 && this.name) {
      arr.push(this.name);
    }
    return arr.join(' ');
  }

}
