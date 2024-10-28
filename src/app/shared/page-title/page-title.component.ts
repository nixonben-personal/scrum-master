import { Component, input } from '@angular/core';
import { Position } from '../../core/model/common.model';
import { PositionData } from '../../core/enum/common.enum';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Routes } from '../../core/constants/route.constants';

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent {
  routes=Routes
  title = input<string>();
  position = input<Position>();
  constructor(
    private authService: AuthService,
    private tostrService: ToastrService,
    private routr:Router
  ) {}

  setPosition() {
    return {
      'justify-content-start': this.position() === PositionData.LEFT,
      'justify-content-end': this.position() === PositionData.RIGHT,
      'justify-content-center': this.position() === PositionData.CENTER,
    };
  }

  logOut() {
    this.authService.logOut().subscribe({
      next: (response: any) => {
        this.tostrService.success(response, 'Success');
        this.routr.navigate([this.routes.Loging])
      },
      error: (error: any) => {
        this.tostrService.error(error, 'Error');
      },
    });
  }
}
