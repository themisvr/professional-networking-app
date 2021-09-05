import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableJobsComponent } from './available-jobs.component';

describe('AvailableJobsComponent', () => {
  let component: AvailableJobsComponent;
  let fixture: ComponentFixture<AvailableJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
