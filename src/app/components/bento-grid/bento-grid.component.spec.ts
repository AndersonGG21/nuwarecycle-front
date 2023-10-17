import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BentoGridComponent } from './bento-grid.component';

describe('BentoGridComponent', () => {
  let component: BentoGridComponent;
  let fixture: ComponentFixture<BentoGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BentoGridComponent]
    });
    fixture = TestBed.createComponent(BentoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
