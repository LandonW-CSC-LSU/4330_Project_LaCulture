import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tigerstadium } from './tigerstadium';

describe('Tigerstadium', () => {
  let component: Tigerstadium;
  let fixture: ComponentFixture<Tigerstadium>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tigerstadium]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tigerstadium);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
