import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfComponent } from './user-prof.component';

describe('UserProfComponent', () => {
  let component: UserProfComponent;
  let fixture: ComponentFixture<UserProfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
