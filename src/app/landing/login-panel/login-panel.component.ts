import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPanelComponent implements OnInit{

  showFormLogin? = true;
  showFormChangePassword? = false;
  showFormCreateAccount? = false;
  constructor() { }

  ngOnInit(): void {
  }

}
