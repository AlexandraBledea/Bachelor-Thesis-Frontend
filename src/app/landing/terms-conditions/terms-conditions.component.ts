import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss']
})
export class TermsConditionsComponent implements OnInit{

  constructor(private router: Router){

  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login'])
  }

  goToRegister() {
    this.router.navigate(['/register'])
  }
}
