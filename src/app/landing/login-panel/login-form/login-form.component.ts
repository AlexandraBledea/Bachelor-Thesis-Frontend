import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';
import {UserLoginData} from "../../../shared/data-type/UserLoginData";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  hidePassword = true;
  showPasswordErrorMessage = false;
  loginUserDataFormGroup = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    }
  )

  ngOnInit() {
  }

  resetWarnings(){
    this.showPasswordErrorMessage = false;
  }

  loginUser(){

    const valuesFromForm = this.loginUserDataFormGroup.value;

    const loginData:UserLoginData = {
      email: valuesFromForm.email!,
      password: valuesFromForm.password!
    }

    if(!this.loginUserDataFormGroup.invalid){
      this.userService.login(loginData).subscribe(result => {

        if(result['token'] == '') this.showPasswordErrorMessage = true;
        else {
          this.cookieService.set('Token', result['token']);
          this.router.navigate(['../home']);
        }
      })
    }
  }

  constructor(private formBuilder:FormBuilder, private userService : UserService, private router: Router, private cookieService: CookieService) { }

}
