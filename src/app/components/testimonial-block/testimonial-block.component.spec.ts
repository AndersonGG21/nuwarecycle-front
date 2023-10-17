import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialBlockComponent } from './testimonial-block.component';

describe('TestimonialBlockComponent', () => {
  let component: TestimonialBlockComponent;
  let fixture: ComponentFixture<TestimonialBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestimonialBlockComponent]
    });
    fixture = TestBed.createComponent(TestimonialBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
