import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  OnInit,
  Input
} from '@angular/core';

import { UserService } from '../../user/user.service';

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

  @Input() x: string;
  @Input() y: string;
  @Input() id: string;

  private parentEl: any = null;
  private itemCoords: Point;
  private itemSize: Point;
  private canvasSize: Point;

  constructor(private el: ElementRef,
    private renderer: Renderer2,
    private user: UserService)
  {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
  }

  ngOnInit() {
    this.parentEl = this.el.nativeElement.parentElement;
    this.itemCoords = new Point(this.el.nativeElement.getBoundingClientRect().left,
                                this.el.nativeElement.getBoundingClientRect().top);

    this.itemSize = new Point(this.el.nativeElement.getBoundingClientRect().height,
                              this.el.nativeElement.getBoundingClientRect().width);

    this.canvasSize = new Point(this.parentEl.getBoundingClientRect().height,
                              this.parentEl.getBoundingClientRect().width);

    this.setCoords(this.x, this.y);
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
  	event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = 'move';
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    const _xoffset: number = event.pageX - this.itemCoords.xcoord;
    const _yoffset: number = event.pageY - this.itemCoords.ycoord;
    const _ch = this.itemSize.xcoord;

    if(_yoffset > 0 &&
        _xoffset > 0 &&
        _yoffset <= this.canvasSize.ycoord &&
        _xoffset <= this.canvasSize.xcoord)
    {
      this.setCoords((_xoffset - _ch), (_yoffset - _ch/2));
      this.saveCoords(this.id, (_xoffset - _ch), (_yoffset - _ch/2));
    } else {
    	return false;
    }
  }

  private setCoords(x, y) {
    this.renderer.setStyle(this.el.nativeElement, 'left', `${x}px`);
    this.renderer.setStyle(this.el.nativeElement, 'top', `${y}px`);
  }

  private saveCoords(id, x, y) {
    this.user.saveUserItemPositions(id, x, y).subscribe();
  }
}
