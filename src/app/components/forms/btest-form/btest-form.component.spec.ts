import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtestFormComponent } from './btest-form.component';

describe('BtestFormComponent', () => {
  let component: BtestFormComponent;
  let fixture: ComponentFixture<BtestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtestFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
