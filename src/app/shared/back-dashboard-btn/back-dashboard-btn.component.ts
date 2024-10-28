import { Component } from '@angular/core';
import { Routes } from '../../core/constants/route.constants';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-dashboard-btn',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './back-dashboard-btn.component.html',
  styleUrl: './back-dashboard-btn.component.scss'
})
export class BackDashboardBtnComponent {
  routes=Routes
}
