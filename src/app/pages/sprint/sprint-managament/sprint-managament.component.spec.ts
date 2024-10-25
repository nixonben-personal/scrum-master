import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintManagamentComponent } from './sprint-managament.component';

describe('SprintManagamentComponent', () => {
  let component: SprintManagamentComponent;
  let fixture: ComponentFixture<SprintManagamentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintManagamentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintManagamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
