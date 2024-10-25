import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
  TemplateRef,
} from '@angular/core';
import { Card } from '../../core/model/common.model';
import { CreateStoryComponent } from '../../pages/story/modal/create-story/create-story.component';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { SharedService } from '../../core/service/shared.service';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [CommonModule, CreateStoryComponent, RouterModule],
  templateUrl: './dashboard-card.component.html',
 // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCardComponent {
  @Input() cardData!: Card;
  isDashboard=input<boolean>()
  isButtons = input<boolean>();
  private modalService = inject(NgbModal);
  private router = inject(Router);
  private sharedService = inject(SharedService);
  constructor() {}

  ngOnInit() {
    this.subscribeCountSubject();
  }

  subscribeCountSubject() {
    this.sharedService.getTotalCount();
    this.sharedService.storyCount$.subscribe((res) => {
      if(this.isDashboard()){
        (this.cardData.title = 'Total Number of Stories'),
        (this.cardData.count = res);
      }
     
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(CreateStoryComponent, {
      centered: true,
    });
    // modalRef.componentInstance.name = 'World';
  }

  
}
