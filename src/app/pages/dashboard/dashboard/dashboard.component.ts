import { Component, inject } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { Card } from '../../../core/model/common.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageTitleComponent, DashboardCardComponent,RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  dashBoardCardData: Card[]=[]
  private modalService = inject(NgbModal);
  ngOnInit(){
    this.setCardData()
  }

  setCardData(){
    this.dashBoardCardData.push({
      title:'Total Number of Stories',
      count:20
    })
  }

}
