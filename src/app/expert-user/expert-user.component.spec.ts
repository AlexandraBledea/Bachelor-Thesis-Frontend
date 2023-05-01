import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertUserComponent } from './expert-user.component';

describe('ExpertUserComponent', () => {
  let component: ExpertUserComponent;
  let fixture: ComponentFixture<ExpertUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpertUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
