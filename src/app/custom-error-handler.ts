import { environment } from './../environments/environment';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  handleError(error) {
    // do something with the exception

    try {
      console.log(JSON.stringify(error.stack, null, 2));
    } catch (error) {
      console.log(error.toString());
    }

    if (!environment.production) {
      // alert(error);
    }

  }

}
