import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marielaveau } from './marielaveau';

describe('Marielaveau', () => {
  let component: Marielaveau;
  let fixture: ComponentFixture<Marielaveau>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marielaveau]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marielaveau);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
