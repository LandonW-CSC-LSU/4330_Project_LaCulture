import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ww2museum } from './ww2museum';

describe('Ww2museum', () => {
  let component: Ww2museum;
  let fixture: ComponentFixture<Ww2museum>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ww2museum]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ww2museum);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
