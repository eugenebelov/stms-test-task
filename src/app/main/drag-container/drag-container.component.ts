import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'stms-drag-container',
  templateUrl: './drag-container.component.html',
  styleUrls: ['./drag-container.component.css']
})
export class DragContainerComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.http.get('http://localhost:3000/positions')
  }

  onDragOver(event:any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    return false;
  }
}
