import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Superdome } from './superdome';

describe('Superdome', () => {
  let component: Superdome;
  let fixture: ComponentFixture<Superdome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Superdome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Superdome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
