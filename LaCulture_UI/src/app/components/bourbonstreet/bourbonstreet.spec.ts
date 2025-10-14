import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bourbonstreet } from './bourbonstreet';

describe('Bourbonstreet', () => {
  let component: Bourbonstreet;
  let fixture: ComponentFixture<Bourbonstreet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bourbonstreet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bourbonstreet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
