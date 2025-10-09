import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frenchquarter } from './frenchquarter';

describe('Frenchquarter', () => {
  let component: Frenchquarter;
  let fixture: ComponentFixture<Frenchquarter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Frenchquarter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Frenchquarter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
