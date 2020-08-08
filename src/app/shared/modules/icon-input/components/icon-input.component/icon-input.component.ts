import {
  Component,
  AfterViewInit,
  Input,
  ElementRef,
  ViewChild
} from '@angular/core';

import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';


const noop = () => {
};

// <div class="inner-addon left-addon">
//     <i class="glyphicon glyphicon-user"></i>
//     <input type="text" class="form-control" />
// </div>
@Component({
  selector: 'app-icon-input',
  styleUrls: ['./icon-input.component.css'],
  template: `
    <div class="inner-addon right-validate" [class.left-addon]="lefticon" [class.right-addon]="inputtype === 'password'">
        <i *ngIf="lefticon" class="left-icon {{lefticon}}"></i>
        <input #input
                    type="{{inputtype}}"
                    class="form-control"
                    [class.validation-icon]="validationIcon"
                     placeholder="{{placeholder}}"
                    (blur)="onTouched($event)"
                    [(ngModel)]="value" [style.border-color]="setBorderColor()"
                    >

        <i #toggler *ngIf="inputtype === 'password'" class="ft ft-eye" [class.right-icon-with-validation]="validationIcon" [class.right-icon-without-validation]="!validationIcon"></i>
        <i *ngIf="validationIcon" class="validataion-icon glyphicon glyphicon-ok" [style.color]="getCheckColor()"></i>
    </div>

    `,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: IconInputComponent }
  ]
})
export class IconInputComponent implements AfterViewInit, ControlValueAccessor {

  private _value: string;
  private _onChange: (_: any) => void = noop;

  @ViewChild('input', { static: true }) el: ElementRef;
  @ViewChild('toggler') toggler: ElementRef;
  @Input() placeholder: string;
  @Input() behaviour = 'click';
  @Input() lefticon: string = null;
  @Input() inputtype = 'text';
  @Input() controlref: FormGroup;
  @Input() validationIcon = true;
  @Input() formControlName = '';
  public onTouched: any = () => { /*Empty*/ };

  setBorderColor() {
    if (this.controlref && this.controlref.controls[this.formControlName] && this.controlref.controls[this.formControlName].touched) {
      if (this.controlref.controls[this.formControlName].valid) {
        // control touched and valid
        return '';
      } else {
        // control touched but NOT valid
        return 'red';
      }
    } else {
      // control not touched yet
      return '';
    }
  }



  getCheckColor() {
    if (this.controlref && this.controlref.controls[this.formControlName] && this.controlref.controls[this.formControlName].touched) {
      if (this.controlref.controls[this.formControlName].valid) {
        // control touched and valid
        return 'green';
      } else {
        // control touched but NOT valid
        return '';
      }
    } else {
      // control not touched yet
      return '';
    }
  }


  get value(): any {
    return this._value;
  }

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this._onChange(v);

    }
  }

  ngAfterViewInit() {
    const __this = this;


    if (__this.toggler) {
      // set default key icon for password field, if none was specified
      if (this.inputtype === 'password' && !this.lefticon) {
        this.lefticon = 'ft ft-key fa-fw';
      }

      const textbox = __this.el.nativeElement;
      const toggler = __this.toggler.nativeElement;
      const togglerIcon = toggler;

      if (__this.behaviour === 'press') {
        toggler.addEventListener('mousedown', (e) => {
          textbox.type = 'text';
          togglerIcon.classList.remove('ft-eye');
          togglerIcon.classList.add('ft-eye-slash');
        });
        toggler.addEventListener('mouseup', (e) => {
          textbox.type = 'password';
          togglerIcon.classList.remove('ft-eye-slash');
          togglerIcon.classList.add('ft-eye');
        });
      }

      if (__this.behaviour === 'click') {
        toggler.addEventListener('click', (e) => {
          textbox.type = textbox.type === 'password' ? 'text' : 'password';
          togglerIcon.classList.toggle('ft-eye');
          togglerIcon.classList.toggle('ft-eye-slash');
        });
      }
    }
  }

  writeValue(value: any) {
    this._value = value;
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

}
