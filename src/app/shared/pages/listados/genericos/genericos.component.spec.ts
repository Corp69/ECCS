import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericosComponent } from './genericos.component';

describe('GenericosComponent', () => {
  let component: GenericosComponent;
  let fixture: ComponentFixture<GenericosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
