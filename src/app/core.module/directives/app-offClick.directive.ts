
import { OnDestroy } from '@angular/core/core';
import { Directive, Input, OnInit, ViewContainerRef, Injectable, ElementRef, AfterContentInit, EventEmitter, Output, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { LoggerService } from 'app/shared/modules/data-service/logger.service';

export interface IdAndComponent {
  id: number;
  component: any;
}

@Injectable()
export class OffClickService {
  public DocumentClick = new Subject<any>();
  private directives: IdAndComponent[] = [];

  constructor(private logger: LoggerService) {
    this.clickCallback = this.clickCallback.bind(this);
    setTimeout(() => { document.addEventListener('mousedown', this.clickCallback); }, 0);
    setTimeout(() => { document.addEventListener('touchstart', this.clickCallback); }, 0);
  }

  private getObjectType(obj: any): string {
    return (!obj || typeof (obj) !== 'object') ? '' : obj.__proto__.constructor.name;
  }

  private clickCallback(event) {
    setTimeout(() => this.DocumentClick.next(event), 100); // need this timeout !! min. 100
  }

}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[offClick]'
})
export class OffClickDirective implements OnInit, OnDestroy, AfterContentInit {
  private static ID = 0;
  private _id: number = OffClickDirective.ID++;
  private _component: any;

  @Input() groupname = 'default';
  @Output() onOffClick = new EventEmitter();
  @HostListener('mousedown', ['$event']) onMousedown(event) {
    event.groupname = this.groupname;
    this.onClick(event);
  }

  @HostListener('touchstart', ['$event']) ontouchstart(event) {
    // add our groupname to this event
    event.groupname = this.groupname;
    this.onClick(event);
  }

  constructor(
    private _view: ViewContainerRef,
    private offClickService: OffClickService,
    private logger: LoggerService
  ) { }

  ngAfterContentInit() {
    this._component = (<any>this._view).injector.view.component;

    this.offClickService.DocumentClick.subscribe(event => {
      if (!event.groupname || event.groupname !== this.groupname) {
        this.onOffClick.emit(event);
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }


  private onClick(event: any) {
    // this.logger.info(`clicked on component with group id '${this.groupname}'`);
    // need a delay! min. 100! otherwise that component closes and our x/y click-pos isnt present any more!
    // setTimeout(() => this.clickPrevent(), 100);

    // clicked inside of our directive.. stop click handling!
    // event.stopPropagation();
  }
}
