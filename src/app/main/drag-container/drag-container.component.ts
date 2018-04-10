import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../user/user.service';

class Position {
  x: number;
  y: number;
  id: number;
  type: string;
}

@Component({
  selector: 'stms-drag-container',
  templateUrl: './drag-container.component.html',
  styleUrls: ['./drag-container.component.css']
})
export class DragContainerComponent implements OnInit {
  @Input() name: string;
  @Input() avatar: string;

  positions:Position[];

  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.getUserItemPositions().subscribe((data) => {
      this.positions = data.map((pos) => {
        const p: Position = new Position();
        p.id = pos.id;
        p.x = pos.position.x;
        p.y = pos.position.y;
        p.type = pos.type;

        return p;
      });
    });
  }

  onDragOver(event:any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  }
}
