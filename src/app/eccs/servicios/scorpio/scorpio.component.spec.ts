import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorpioComponent } from './scorpio.component';

describe('ScorpioComponent', () => {
  let component: ScorpioComponent;
  let fixture: ComponentFixture<ScorpioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScorpioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScorpioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
