import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaTimesheetComponent } from './area-timesheet.component';

describe('AreaTimesheetComponent', () => {
  let component: AreaTimesheetComponent;
  let fixture: ComponentFixture<AreaTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaTimesheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
