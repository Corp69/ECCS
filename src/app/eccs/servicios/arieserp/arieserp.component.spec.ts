import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArieserpComponent } from './arieserp.component';

describe('ArieserpComponent', () => {
  let component: ArieserpComponent;
  let fixture: ComponentFixture<ArieserpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArieserpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArieserpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
