import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';
export const slideInAnimation =
  trigger('routeAnimations', [
    transition('newuser => address, address => schedule, schedule => checkout, checkout => confirm', [
      style({ position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          overflow: 'hidden'
        })
      ]),
      query(':enter', [
        style({ left: '100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '-100%'}))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('address => newuser, schedule => address, checkout => schedule, confirm => checkout', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
