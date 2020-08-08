import { Component, OnInit, Input, ElementRef, Renderer2, OnChanges, ViewEncapsulation } from '@angular/core';
import { AnimationBuilder } from 'css-animator/builder';

@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationIconComponent implements OnInit, OnChanges {

  @Input() count;
  @Input() hideCount;
  @Input() alwaysShow;
  @Input() animation;
  @Input() appearAnimation;
  @Input() disappearAnimation;
  @Input() updateAnimation;
  @Input() clearTrigger;
  @Input() wideThreshold;


  public animator = new AnimationBuilder();
  public animationPromise;
  public visible;
  public animationSet = {
    appear: this.appearAnimation || this.animation || 'grow',
    update: this.updateAnimation || this.animation || 'grow',
    disappear: this.disappearAnimation
  };

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2
  ) {
    this.visible = false;
    this.wideThreshold = this.wideThreshold || 100;
    this.alwaysShow = this.alwaysShow || false;
  }

  ngOnChanges(changes) {
    if (changes.clearTrigger) {
      this.count = 0;
    }


    if (this.visible === false && (this.alwaysShow || this.count > 0)) {
      this.appear();
    } else if (!this.alwaysShow && this.visible === true && this.count <= 0) {
      // Only clear if we're not always showing
      this.clear();
    } else {
      this.update();
    }

    // Use more of a pill shape if the count is high enough.
    if (Math.abs(this.count) >= this.wideThreshold) {
      this.renderer.addClass(this.elementRef.nativeElement, 'wide-icon');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'wide-icon');
    }
  }

  ngOnInit() {

  }


  handleAnimation(animationClass) {
    if (animationClass) {
      if (this.animationPromise) {
        this.animator.stop(this.elementRef.nativeElement, true);
      }

      this.animationPromise = this.animator
        .setType(animationClass)
        .animate(this.elementRef.nativeElement);

      this.animationPromise.then(() => {
        // Animation finished
        this.renderer.removeClass(this.elementRef.nativeElement, animationClass);
      })
        .catch(() => {
          // Animation interrupted
        });

      return this.animationPromise;
    }

  }

  appear() {
    this.visible = true;
    this.handleAnimation(this.animationSet.appear);
  }

  clear() {
    this.handleAnimation(this.animationSet.disappear).then((needsDigest) => {
      this.visible = false;
    });
  }

  update() {
    this.handleAnimation(this.animationSet.update);
  }

}

