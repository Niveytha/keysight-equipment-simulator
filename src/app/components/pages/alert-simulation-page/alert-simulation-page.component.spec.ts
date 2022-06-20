import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSimulationPageComponent } from './alert-simulation-page.component';

describe('AlertSimulationPageComponent', () => {
  let component: AlertSimulationPageComponent;
  let fixture: ComponentFixture<AlertSimulationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertSimulationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertSimulationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
