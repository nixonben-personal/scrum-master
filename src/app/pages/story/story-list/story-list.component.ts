import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { StoryService } from '../../../core/service/story.service';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [PageTitleComponent, DashboardCardComponent, RouterModule],
  templateUrl: './story-list.component.html',
})
export class StoryListComponent {
  dashBoardCardData: any[] = [];
  storyService = inject(StoryService);
  constructor() {}
  ngOnInit() {
    this.getAllStoryList();
  }

  getAllStoryList() {
    this.storyService.getAllStoryList().forEach((element: any) => {
      const dataToSend = {
        title: element?.story_name,
        count: element?.story_point,
      };
      this.dashBoardCardData.push(dataToSend);
    });
  }
}
