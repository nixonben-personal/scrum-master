import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { StorageService } from '../../../core/service/storage.service';
import { RouterModule } from '@angular/router';
import { ScrumInputComponent } from '../../../shared/custom/scrum-input/scrum-input.component';

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
  dashBoardCardData: any[] = [];
  storageService = inject(StorageService);
  constructor() {}
  ngOnInit() {
    this.getAllStoryList();
  }

  generateSprintData() {
    const data = this.storageService.getLocalStorageItem('storyData')
      ? this.storageService.getLocalStorageItem('storyData')
      : [];
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
    this.generateSprintData();
  }

  clearStories() {
    this.dashBoardCardData = [];
    this.storageService.removeLocalStorageValue('storyData');
  }

  clearSprint() {
    this.dashBoardCardData = [];
  }
}
