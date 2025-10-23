import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statecapitol } from './statecapitol';

describe('Statecapitol', () => {
  let component: Statecapitol;
  let fixture: ComponentFixture<Statecapitol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statecapitol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Statecapitol);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
