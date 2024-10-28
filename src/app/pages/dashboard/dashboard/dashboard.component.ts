import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../shared/page-title/page-title.component';
import { DashboardCardComponent } from '../../../shared/dashboard-card/dashboard-card.component';
import { Card } from '../../../core/model/common.model';
import { RouterModule } from '@angular/router';
import { Routes } from '../../../core/constants/route.constants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PageTitleComponent, DashboardCardComponent,RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  routes=Routes
  dashBoardCardData: Card[]=[]
  ngOnInit(){
    this.setCardData()
  }

  setCardData(){
    this.dashBoardCardData.push({
      title:'Total Number of Stories',
      count:20,
      description:''
    })
  }

}
