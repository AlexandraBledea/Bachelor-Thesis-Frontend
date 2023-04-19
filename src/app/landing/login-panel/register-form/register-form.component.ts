import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

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

  registerFormGroup = this.formBuilder.group({
    firstname: ["", Validators.required],
    lastname: ["", Validators.required],
    gender: ["", Validators.required],
    email: ["", Validators.required],
    password1: ["", Validators.required],
    password2: ["", Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
  }

  createAccount(){

  }

  resetWarnings() {
    this.showCreateAccountErrorMessage = false;
    this.showCreateAccountSuccessfulMessage = false;
  }

}
