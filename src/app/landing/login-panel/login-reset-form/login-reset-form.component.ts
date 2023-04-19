import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-reset-form',
  templateUrl: './login-reset-form.component.html',
  styleUrls: ['./login-reset-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginResetFormComponent implements OnInit {

  hidePasswordOld = true;
  hidePasswordNew1 = true;
  hidePasswordNew2 = true;
  showFormLogin = false;
  showPasswordErrorString = false;
  showPasswordSameString = false;
  showEmailErrorString = false;
  showPasswordEmptyString = false;
  showSuccesfulPasswordMessage = false;
  loginChangePasswordFormGroup = this.formBuilder.group({
    email: ["", Validators.required],
    oldPassword: ["", Validators.required],
    newPassword: ["", Validators.required],
    newPassword2: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  changeUserPassword(){

  }

  resetWarnings() {
    this.showPasswordErrorString = false;
    this.showPasswordSameString = false;
    this.showEmailErrorString = false;
    this.showPasswordEmptyString = false;
    this.showSuccesfulPasswordMessage = false;
  }
}
