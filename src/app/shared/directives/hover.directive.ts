import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  constructor(private elemRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') mouseover() {
    this.renderer.addClass(this.elemRef.nativeElement, 'active');
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.removeClass(this.elemRef.nativeElement, 'active');
  }
}
