import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hhmmss'
})
export class HHMMSSPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.hhmmss(value);
  }

  hhmmss(secs) {
    let minutes = Math.floor(secs / 60);
    secs = Math.floor(secs % 60);
    const hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(secs);
  }

  pad(num) {
    if (num < 10) {
      return ('0' + num).slice(-2);
    }

    if (num >= 10 ) {
      return num;
    }

  }

}
