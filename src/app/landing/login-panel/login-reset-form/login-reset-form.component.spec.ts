import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginResetFormComponent } from './login-reset-form.component';

describe('LoginResetFormComponent', () => {
  let component: LoginResetFormComponent;
  let fixture: ComponentFixture<LoginResetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginResetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginResetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
