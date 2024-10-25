import { Component, input } from '@angular/core';
import { Position } from '../../core/model/common.model';
import { PositionData } from '../../core/enum/common.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {
  title = input<string>();
  position = input<Position>();

  setPosition() {
    return {
      'justify-content-start': this.position()===PositionData.LEFT,
      'justify-content-end': this.position()===PositionData.RIGHT,
      'justify-content-center': this.position()===PositionData.CENTER
    };
  }
}
