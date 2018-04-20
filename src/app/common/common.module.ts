import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragdropDirective } from '@stms-common/dragndrop/dragdrop.directive';
import { DragContainerComponent } from '@stms-common/dragndrop/drag-container.component';

@NgModule({
  imports: [CommonModule],
  exports: [DragdropDirective, DragContainerComponent],
  declarations: [DragdropDirective, DragContainerComponent]
})

export class StmsCommonModule { }
