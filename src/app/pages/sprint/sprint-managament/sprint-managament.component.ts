import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { ScrumInputComponent } from '../../../shared/custom/scrum-input/scrum-input.component';
import { StoryService } from '../../../core/service/story.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { Card } from '../../../core/model/common.model';
import { Routes } from '../../../core/constants/route.constants';
import { BackDashboardBtnComponent } from '../../../shared/back-dashboard-btn/back-dashboard-btn.component';

@Component({
  selector: 'app-sprint-managament',
  standalone: true,
  imports: [
    PageTitleComponent,
    DashboardCardComponent,
    RouterModule,
    ScrumInputComponent,
    FormsModule,
    BackDashboardBtnComponent
  ],
  templateUrl: './sprint-managament.component.html',
})
export class SprintManagamentComponent {
  routes=Routes
  sprintCapacity!: number;
  dashBoardCardData: any[] = [];
  storyList: any[] = [];
  storyService = inject(StoryService);
  tostrService = inject(ToastrService);

  constructor() {}
  ngOnInit() {
    this.getAllStoryList();
  }

  generateSprintData() {
    let totalPoints = 0;
    this.dashBoardCardData = []; // Clear previously stored data

    const sortedStories: any[] = [...this.storyList].sort(
      (a: any, b: any) => b.count - a.count
    );

    for (let i = 0; i < sortedStories.length; i++) {
      if (sortedStories[i].count === this.sprintCapacity) {
        this.dashBoardCardData.push(sortedStories[i]);
        return; // Exit if an exact match is found
      }
    }

    // If no exact match, select stories until capacity is reached
    for (let i = 0; i < sortedStories.length; i++) {
      const storyPoints = Number(sortedStories[i].count); // Ensure count is treated as a number
      if (totalPoints + storyPoints <= this.sprintCapacity) {
        totalPoints += storyPoints; // Add points to total
        this.dashBoardCardData.push(sortedStories[i]); // Add the story to the selected list
      }
    }
  }

  getAllStoryList() {
    this.storyService.getAllStoryList().subscribe({
      next: (response: Card[]) => {
        this.setData(response);
      },
    });
  }

  setData(data: Card[] | []) {
    data.forEach((response: any) => {
      const dataToSend = {
        title: response?.story_name,
        count: response?.story_point,
        description: response?.description,
      };
      this.dashBoardCardData.push(dataToSend);
      this.storyList.push(dataToSend);
    });
  }

  autoSelect() {
    this.dashBoardCardData = [];
    this.generateSprintData();
  }

  clearStories() {
    this.storyService.deleteStoryList('storyData').subscribe({
      next: (response: any) => {
        this.tostrService.success(response, 'Success');
        this.dashBoardCardData = [];
        this.storyList = [];
     
      },
      error: (error: any) => {
        this.tostrService.error(error, 'Error');
      },
    });
  }

  clearSprint() {
    this.dashBoardCardData = [];
    this.tostrService.success('Sprint deleted successfully', 'Success');
  }
}
