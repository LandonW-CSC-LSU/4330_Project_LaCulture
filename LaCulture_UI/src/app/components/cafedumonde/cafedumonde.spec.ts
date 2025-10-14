import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cafedumonde } from './cafedumonde';

describe('Cafedumonde', () => {
  let component: Cafedumonde;
  let fixture: ComponentFixture<Cafedumonde>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cafedumonde]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cafedumonde);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
