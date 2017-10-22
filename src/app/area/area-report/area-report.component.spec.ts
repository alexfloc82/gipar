import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaReportComponent } from './area-report.component';

describe('AreaReportComponent', () => {
  let component: AreaReportComponent;
  let fixture: ComponentFixture<AreaReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
