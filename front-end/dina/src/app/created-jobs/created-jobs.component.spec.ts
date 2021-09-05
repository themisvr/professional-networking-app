import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedJobsComponent } from './created-jobs.component';

describe('CreatedJobsComponent', () => {
  let component: CreatedJobsComponent;
  let fixture: ComponentFixture<CreatedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
