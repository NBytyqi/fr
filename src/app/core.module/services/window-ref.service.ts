import {Injectable} from '@angular/core';

function _window(): Window {
  // return the native window obj
  return window;
}

@Injectable()
export class WindowRef {

  get nativeWindow(): Window {
    return _window();
  }

}
