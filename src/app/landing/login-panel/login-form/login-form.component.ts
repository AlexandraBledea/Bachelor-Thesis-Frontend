import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CookieService} from 'ngx-cookie-service';

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

  }

  constructor(private formBuilder:FormBuilder, private router: Router, private cookieService: CookieService) { }

}
