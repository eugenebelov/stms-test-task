import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';

class Point {
  xcoord: number = 0;
  ycoord: number = 0;

  constructor(offsetX: number, offsetY: number) {
    this.xcoord = offsetX;
    this.ycoord = offsetY;
  }
}

@Directive({
  selector: '[stmsDragdrop]',
  host: {
    'draggable': 'true'
  }
})
export class DragdropDirective {
  private parentEl: any = null;
  private itemCoords: Point;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
  }

  ngOnInit() {
    this.parentEl = this.el.nativeElement.parentElement;
    this.itemCoords = new Point(this.el.nativeElement.getBoundingClientRect().left,
                                this.el.nativeElement.getBoundingClientRect().top);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
  	event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = 'move';
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    var _xoffset: number = event.pageX - this.itemCoords.xcoord;
    var _yoffset: number = event.pageY - this.itemCoords.ycoord;
    var _ch = event.target.clientHeight;

    if(_yoffset <= 400 && _xoffset <= 600) {
      this.renderer.setStyle(this.el.nativeElement, 'top', `${_yoffset - _ch}px`);
      this.renderer.setStyle(this.el.nativeElement, 'left', `${_xoffset}px`);
    } else {
    	return false;
    }
  }
}
