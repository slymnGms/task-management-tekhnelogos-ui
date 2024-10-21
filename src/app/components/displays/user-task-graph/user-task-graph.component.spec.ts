import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTaskGraphComponent } from './user-task-graph.component';

describe('UserTaskGraphComponent', () => {
  let component: UserTaskGraphComponent;
  let fixture: ComponentFixture<UserTaskGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserTaskGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTaskGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
