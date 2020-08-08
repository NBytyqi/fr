import { AbstractControl, FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'passwordMismatch': `Passwords do not match`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control && control.value && control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex

    if (control && control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control && control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static passwordMatch(AC: AbstractControl) {
    if (AC.get('password') && AC.get('password2')) {
      const password = AC.get('password').value; // to get value in input tag
      const confirmPassword = AC.get('password2').value; // to get value in input tag
      if (password !== confirmPassword) {
        AC.get('password2').setErrors({ 'passwordMismatch': true });
        return { 'passwordMismatch': true };
      } else {
        AC.get('password2').setErrors(null);
        return null;
      }
    }
    return null;
  }

  static isInvalid(formdata: FormGroup, field: string) {
    if (field && formdata.contains(field) && formdata.controls[field].touched) {
      return formdata.controls[field].invalid;
    }
    return false; // default if not touched yet
  }

   static isValid(formdata: FormGroup, field: string) {
    if (field && formdata.contains(field) && formdata.controls[field].touched) {
      return formdata.controls[field].valid;
    }
    return true; // default if not touched yet
  }


}
