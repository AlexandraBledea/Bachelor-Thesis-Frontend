import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPanelComponent implements OnInit{

  showFormLogin? = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }

  goToTermsAndConditions(){
    this.router.navigate(['/terms-and-conditions'])
  }
}
