import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathSelectionComponent } from './path-selection.component';

describe('PathSelectionComponent', () => {
  let component: PathSelectionComponent;
  let fixture: ComponentFixture<PathSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathSelectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
