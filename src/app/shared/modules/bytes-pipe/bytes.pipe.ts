import { Pipe, PipeTransform } from '@angular/core';
import { isNumeric } from 'rxjs/internal-compatibility';

@Pipe({
  name: 'bytesPipe'
})
export class BytesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.formatBytes(value);
  }

  formatBytes(bytes, decimals = 0) {
    if (!isNumeric(bytes)) {
      bytes = parseInt(bytes, 10);
    }
    if (bytes === 0 || bytes === '0') { return '0 Bytes'; }
    const k = 1024,
      dm = decimals || 2,
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

}
