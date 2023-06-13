import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserRegisterData} from "../../../shared/data-type/UserRegisterData";
import {UserService} from "../../../service/user.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {

  hidePassword1 = true;
  hidePassword2 = true;
  showFormLogin = false;

  showCreateAccountErrorMessage = false;
  showCreateAccountSuccessfulMessage = false;
  errorMessage = ""

  registerFormGroup = this.formBuilder.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    gender: ["", Validators.required],
    email: ["", Validators.required],
    password1: ["", Validators.required],
    password2: ["", Validators.required],
  })
  isChecked = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: UserService) {
  }

  ngOnInit(): void {
  }

  createAccount() {
    const valuesFromForm = this.registerFormGroup.value;

    const passwordDoNotMatch = (valuesFromForm.password1 != valuesFromForm.password2);
    const anyFieldIsEmpty = (valuesFromForm.password1 === '' || valuesFromForm.password2 === '' ||
      valuesFromForm.email === '' || valuesFromForm.gender === '' || valuesFromForm.firstname === '' ||
      valuesFromForm.lastname === '')

    if(!this.isChecked){
      this.errorMessage = "You must agree with the terms and conditions in order to create an account!"
      this.showCreateAccountErrorMessage = true
      return;
    } else if (anyFieldIsEmpty) {
      this.errorMessage = "Please fill out all fields."
      this.showCreateAccountErrorMessage = true
      return;
    } else if (passwordDoNotMatch) {
      this.errorMessage = "Passwords must match."
      this.showCreateAccountErrorMessage = true
      return;
    }

    const registerData: UserRegisterData = {
      firstname: valuesFromForm.firstname!,
      lastname: valuesFromForm.lastname!,
      gender: valuesFromForm.gender!,
      email: valuesFromForm.email!,
      password: valuesFromForm.password2!
    }

    this.service.register(registerData).subscribe(result => {
      if (result['Message'] === 'There exists an account with the given email!')
      {
        this.errorMessage = "There exists an account with the given email!"
        this.showCreateAccountErrorMessage = true
      }
      else {
        this.showCreateAccountSuccessfulMessage = true
      }
    })

  }

  resetWarnings() {
    this.showCreateAccountErrorMessage = false;
    this.showCreateAccountSuccessfulMessage = false;
  }

  onChange($event: MatCheckboxChange) {
    this.isChecked = $event.checked
  }
}
