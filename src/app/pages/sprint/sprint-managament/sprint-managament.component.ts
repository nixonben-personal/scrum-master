import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { ScrumInputComponent } from '../../../shared/custom/scrum-input/scrum-input.component';
import { StoryService } from '../../../core/service/story.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sprint-managament',
  standalone: true,
  imports: [
    PageTitleComponent,
    DashboardCardComponent,
    RouterModule,
    ScrumInputComponent,
  ],
  templateUrl: './sprint-managament.component.html',
})
export class SprintManagamentComponent {
  isClicked: boolean = false;
  dashBoardCardData: any[] = [];
  storyService = inject(StoryService);
  tostrService = inject(ToastrService);

  constructor() {}
  ngOnInit() {
    this.getAllStoryList();
  }

  generateSprintData() {
   
    const data = this.storyService.getAllStoryList();
    data?.forEach((element: any) => {
      const dataToSend = {
        title: element?.story_name,
        count: element?.story_point,
      };
      this.dashBoardCardData.push(dataToSend);
    });
  }
  getAllStoryList() {
    this.generateSprintData();
    const slicedItems = this.dashBoardCardData
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    this.dashBoardCardData = slicedItems;
  }

  autoSelect() {
    if (!this.isClicked) {
      this.dashBoardCardData=[]
      this.isClicked = true;
      this.generateSprintData();
    }
  }

  clearStories() {
    this.dashBoardCardData = [];
    this.storyService.deleteStoryList('storyData');
    this.tostrService.success('All stories deleted successfully', 'Success');
  }

  clearSprint() {
    this.dashBoardCardData = [];
    this.tostrService.success('Sprint deleted successfully', 'Success');
  }
}
