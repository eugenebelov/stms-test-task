import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stms-drag-container',
  templateUrl: './drag-container.component.html',
  styleUrls: ['./drag-container.component.css']
})
export class DragContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onDragOver(event:any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  }
}
