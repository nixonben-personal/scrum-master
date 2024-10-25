import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { StorageService } from '../../../core/service/storage.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [PageTitleComponent, DashboardCardComponent,RouterModule],
  templateUrl: './story-list.component.html'
})
export class StoryListComponent {
  dashBoardCardData: any[] = [];
  storageService = inject(StorageService);
  constructor() {}
  ngOnInit() {
    this.getAllStoryList();
  }

  getAllStoryList() {
    const data = this.storageService.getLocalStorageItem(
      'storyData'
    )
      ? this.storageService.getLocalStorageItem('storyData')
      : [];
      data?.forEach((element:any) => {
        const dataToSend={
          title:element?.story_name,
          count:element?.story_point
        }
        this.dashBoardCardData.push(dataToSend)
      });
  }
}
