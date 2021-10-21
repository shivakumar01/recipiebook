import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective {

  @HostBinding('attr.data-toggle') toggle = '';

  @HostListener('click') onClick(EventData: Event)  {
    this.toggle = 'dropdown';
  }
  

  constructor() { }

}
