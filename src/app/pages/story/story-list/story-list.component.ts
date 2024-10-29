import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { RouterModule } from '@angular/router';
import { StoryService } from '../../../core/service/story.service';
import { Card } from '../../../core/model/common.model';
import { ToastrService } from 'ngx-toastr';
import { Routes } from '../../../core/constants/route.constants';
import { BackDashboardBtnComponent } from '../../../shared/back-dashboard-btn/back-dashboard-btn.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateStoryComponent } from '../modal/create-story/create-story.component';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [
    PageTitleComponent,
    DashboardCardComponent,
    RouterModule,
    BackDashboardBtnComponent,
  ],
  templateUrl: './story-list.component.html',
})
export class StoryListComponent {
  routes = Routes;
  dashBoardCardData: any[] = [];
  storyService = inject(StoryService);
  private modalService = inject(NgbModal);
  constructor(private tostrService: ToastrService) {}
  ngOnInit() {
    this.getAllStoryList();
  }

  getAllStoryList() {
    this.storyService.getAllStoryList().subscribe({
      next: (response: any) => {
        this.setData(response);
      },
      error: (error) => {
        this.tostrService.error('Unable to laod data');
      },
    });
  }

  setData(data: Card[] | []) {
    this.dashBoardCardData = [];
    data.forEach((response: any) => {
      const dataToSend = {
        title: response?.story_name,
        count: response?.story_point,
        description: response?.description,
      };
      this.dashBoardCardData.push(dataToSend);
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateStoryComponent, {
      centered: true,
    });
    modalRef.result.then((res: any) => {
      if (res) this.getAllStoryList();
    });
  }
}
