import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Brennans } from './brennans';

describe('Brennans', () => {
  let component: Brennans;
  let fixture: ComponentFixture<Brennans>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Brennans]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Brennans);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
