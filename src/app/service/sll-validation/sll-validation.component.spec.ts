import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SllValidationComponent } from './sll-validation.component';

describe('SllValidationComponent', () => {
  let component: SllValidationComponent;
  let fixture: ComponentFixture<SllValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SllValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SllValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
