import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserChangePasswordData} from "../../../shared/data-type/UserChangePasswordData";
import {UserService} from "../../../service/user.service";

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
  showSuccessfulMessage = false;
  showErrorMessage = false;

  errorMessage = "";
  loginChangePasswordFormGroup = this.formBuilder.group({
    email: ["", Validators.required],
    oldPassword: ["", Validators.required],
    newPassword: ["", Validators.required],
    newPassword2: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private router: Router, private service: UserService) {
  }

  ngOnInit(): void {
  }

  changeUserPassword(){

    const valuesFromForm = this.loginChangePasswordFormGroup.value;
    const emailIsEmpty = (valuesFromForm.email === '');
    const newPasswordsDoNotMatch = (valuesFromForm.newPassword2 != valuesFromForm.newPassword);
    const newPasswordIsSame = (valuesFromForm.oldPassword == valuesFromForm.newPassword);
    const anyPasswordIsEmpty = (valuesFromForm.oldPassword === '' || valuesFromForm.newPassword2 === '' || valuesFromForm.newPassword === '');

    if(emailIsEmpty || anyPasswordIsEmpty) {
      this.errorMessage = "Please fill out all fields."
      this.showErrorMessage = true
    } else if(newPasswordsDoNotMatch){
      this.errorMessage = "New passwords must match"
      this.showErrorMessage = true
    } else if(newPasswordIsSame){
      this.errorMessage = "Your new password can't be the same as your old password."
      this.showErrorMessage = true
    } else {
      const changeData:UserChangePasswordData = {
        email:valuesFromForm.email!,
        oldPassword:valuesFromForm.oldPassword!,
        newPassword:valuesFromForm.newPassword!
      }
      this.service.changePassword(changeData).subscribe(result => {
        console.log(result)
        console.log(result["Message"])
        if(result['Message'] === 'Invalid password or email') {
          this.errorMessage = "The email or the old password is incorrect!"
          this.showErrorMessage = true;
        } else {
          this.showSuccessfulMessage = true;
        }
      })
    }
  }

  resetWarnings() {
    this.showErrorMessage = false;
    this.showSuccessfulMessage = false;
  }
}
