import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaComponent } from './compa.component';

describe('CompaComponent', () => {
  let component: CompaComponent;
  let fixture: ComponentFixture<CompaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
