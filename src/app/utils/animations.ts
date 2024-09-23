import { trigger, state, style, transition, animate } from '@angular/animations';

export const cardAnimation = trigger('cardAnimation', [
  state('void', style({ opacity: 0, transform: 'translateX({{startX}})' }), { params: { startX: '0px' } }),
  
  transition(':enter', [
    animate('1000ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  
  transition(':leave', [
    animate('1000ms ease-in', style({ opacity: 0, transform: 'translateX({{startX}})' })),
  ]),
]);
