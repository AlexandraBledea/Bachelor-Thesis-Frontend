import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyStatementComponent } from './privacy-statement.component';

describe('TermsConditionsComponent', () => {
  let component: PrivacyStatementComponent;
  let fixture: ComponentFixture<PrivacyStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyStatementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
