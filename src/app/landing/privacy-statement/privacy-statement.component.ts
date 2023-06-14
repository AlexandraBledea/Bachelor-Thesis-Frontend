import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './privacy-statement.component.html',
  styleUrls: ['./privacy-statement.component.scss']
})
export class PrivacyStatementComponent implements OnInit{

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
