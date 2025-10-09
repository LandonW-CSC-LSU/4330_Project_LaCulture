import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Audubonzoo } from './audubonzoo';

describe('Audubonzoo', () => {
  let component: Audubonzoo;
  let fixture: ComponentFixture<Audubonzoo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Audubonzoo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Audubonzoo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
