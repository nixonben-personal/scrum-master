import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrumInputComponent } from './scrum-input.component';

describe('ScrumInputComponent', () => {
  let component: ScrumInputComponent;
  let fixture: ComponentFixture<ScrumInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrumInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrumInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
