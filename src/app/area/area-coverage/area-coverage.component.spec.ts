import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCoverageComponent } from './area-coverage.component';

describe('AreaCoverageComponent', () => {
  let component: AreaCoverageComponent;
  let fixture: ComponentFixture<AreaCoverageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaCoverageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
