import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackDashboardBtnComponent } from './back-dashboard-btn.component';

describe('BackDashboardBtnComponent', () => {
  let component: BackDashboardBtnComponent;
  let fixture: ComponentFixture<BackDashboardBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackDashboardBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackDashboardBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
