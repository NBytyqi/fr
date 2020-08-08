import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

constructor() { }

info(...msg) {
  console.log(msg);
}

error(...msg) {
  console.error(msg);
}

}
