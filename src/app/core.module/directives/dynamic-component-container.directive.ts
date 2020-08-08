// this is used to mark where dynamicly generated components are inserted
import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appDynamicContainer]'
})
export class DynamicComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}

